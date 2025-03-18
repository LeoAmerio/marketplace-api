import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../config/supabase.config';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template } from './entity/template.entity';

@Injectable()
export class TemplatesService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('templates')
      .insert(createTemplateDto)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error creating template: ${error.message}`);
    }
    
    return data;
  }

  async findAll(): Promise<Template[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching templates: ${error.message}`);
    }
    
    return data || [];
  }

  async findOne(id: string): Promise<Template> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    
    return data;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<Template> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('templates')
      .update(updateTemplateDto)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating template: ${error.message}`);
    }
    
    return data;
  }

  async remove(id: string): Promise<void> {
    const supabase = this.supabaseService.getClient();
    
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting template: ${error.message}`);
    }
  }
}