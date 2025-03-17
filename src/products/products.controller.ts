import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  async addProduct(@Body() product: { name: string; price: number; image: string }) {
    return this.productsService.addProduct(product);
  }
}
