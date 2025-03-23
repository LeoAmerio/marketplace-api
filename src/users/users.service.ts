import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../config/supabase.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const supabase = this.supabaseService.getClient();
    
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      user_metadata: {
        name: createUserDto.name,
        role: createUserDto.role,
      },
    });
    
    if (authError) {
      throw new Error(`Error creating user: ${authError.message}`);
    }
    
    // Then, create the user record in our users table
    const userData = {
      id: authData.user.id,
      email: createUserDto.email,
      name: createUserDto.name,
      role: createUserDto.role,
      is_active: true,
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) {
      // If there's an error, try to delete the auth user to maintain consistency
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error(`Error creating user record: ${error.message}`);
    }
    
    return data;
  }

  async findAll(): Promise<User[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
    
    return data || [];
  }

  async findOne(id: string): Promise<User> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const supabase = this.supabaseService.getClient();
    
    // Update user metadata if name is provided
    if (updateUserDto.name) {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        id,
        {
          user_metadata: {
            name: updateUserDto.name,
            role: updateUserDto.role,
          },
        }
      );
      
      if (authError) {
        throw new Error(`Error updating user auth data: ${authError.message}`);
      }
    }
    
    // Update user record in our users table
    const { data, error } = await supabase
      .from('users')
      .update({
        name: updateUserDto.name,
        role: updateUserDto.role,
        is_active: updateUserDto.is_active,
        updated_at: new Date(),
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
    
    return data;
  }

  async remove(id: string): Promise<void> {
    const supabase = this.supabaseService.getClient();
    
    // Soft delete - update the deleted_at field and set is_active to false
    const { error } = await supabase
      .from('users')
      .update({
        deleted_at: new Date(),
        is_active: false,
        updated_at: new Date(),
      })
      .eq('id', id)
      .is('deleted_at', null);
    
    if (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
    
    // Note: We don't delete the auth user, just mark our record as deleted
  }
}