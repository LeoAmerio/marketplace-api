import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './templates/templates.module';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';
import { SupabaseModule } from './config/supabase.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    TemplatesModule,
    AuthModule,
    SalesModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
