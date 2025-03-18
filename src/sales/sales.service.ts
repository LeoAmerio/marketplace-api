import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../config/supabase.config';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('sales')
      .insert(createSaleDto)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error creating sale: ${error.message}`);
    }
    
    return data;
  }

  async findAll(): Promise<Sale[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching sales: ${error.message}`);
    }
    
    return data || [];
  }

  async findByUser(userId: string): Promise<Sale[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching user sales: ${error.message}`);
    }
    
    return data || [];
  }

  async findOne(id: string): Promise<Sale> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    
    return data;
  }

  async updateStatus(id: string, status: string): Promise<Sale> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('sales')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating sale status: ${error.message}`);
    }
    
    return data;
  }

  async getSalesAnalytics() {
    const supabase = this.supabaseService.getClient();
    
    // Get total sales count
    const { count: totalSales, error: countError } = await supabase
      .from('sales')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw new Error(`Error getting sales count: ${countError.message}`);
    }
    
    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabase
      .rpc('get_total_revenue');
    
    if (revenueError) {
      throw new Error(`Error getting total revenue: ${revenueError.message}`);
    }
    
    // Get sales by template
    const { data: salesByTemplate, error: templateError } = await supabase
      .from('sales_by_template')
      .select('*');
    
    if (templateError) {
      throw new Error(`Error getting sales by template: ${templateError.message}`);
    }
    
    // Get monthly revenue
    const { data: monthlyRevenue, error: monthlyError } = await supabase
      .from('monthly_revenue')
      .select('*')
      .order('month', { ascending: true });
    
    if (monthlyError) {
      throw new Error(`Error getting monthly revenue: ${monthlyError.message}`);
    }
    
    return {
      totalSales,
      totalRevenue: revenueData?.[0]?.total_revenue || 0,
      salesByTemplate: salesByTemplate || [],
      monthlyRevenue: monthlyRevenue || [],
    };
  }
}