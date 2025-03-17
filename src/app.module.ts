import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [ProductsController, AuthController],
  providers: [SupabaseService, ProductsService, AuthService],
})
export class AppModule {}
