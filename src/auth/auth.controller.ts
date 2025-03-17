import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signUp(email, password);
  }

  @Post('signin')
  async signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  @Get('user')
  async getUser(@Req() req) {
    return this.authService.getUser();
  }

  @Post('signout')
  async signOut() {
    return this.authService.signOut();
  }
}
