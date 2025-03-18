import { Controller, Post, Body, Get, Req, BadRequestException } from '@nestjs/common';
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

  // Enviar el correo de recuperación
  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('update-password')
  async updatePassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string
  ) {
    if (!token || !newPassword) {
      throw new BadRequestException('Token y nueva contraseña son requeridos');
    }
    return this.authService.updatePassword(token, newPassword);
  }
}
