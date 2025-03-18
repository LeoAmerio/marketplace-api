import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { SupabaseModule } from 'src/config/supabase.module';
import { SupabaseService } from 'src/config/supabase.config';

@Module({
  imports: [SupabaseModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService]
})
export class TemplatesModule {}