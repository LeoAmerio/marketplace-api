import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SupabaseService } from '../config/supabase.config';

@Module({
  controllers: [SalesController],
  providers: [SalesService, SupabaseService]
})
export class SalesModule {}
