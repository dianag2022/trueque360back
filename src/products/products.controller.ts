import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthService } from '../auth/auth.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  async addProduct(
    @Body() product: { name: string; price: number; image: string },
    @Headers('Authorization') authHeader: string
  ) {
    const token = authHeader?.split(' ')[1]; // Bearer <token>
    if (!token) throw new UnauthorizedException('Token missing');

    const user = await this.authService.validateToken(token);
    if (!user) throw new UnauthorizedException('Invalid token');

    return this.productsService.addProduct(product);
  }
}