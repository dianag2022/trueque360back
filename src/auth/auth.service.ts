import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw new Error(`Error signing up: ${error.message}`);
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(`Error signing in: ${error.message}`);
    }
    return {
      access_token: data.session.access_token,  // ← Devuelve el token al frontend
      user: data.user
    };
  }

  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(`Error signing out: ${error.message}`);
    }
    return { message: 'Signed out successfully' };
  }

  async validateToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    return { data, error };
  }

  async resetPassword(email: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https:localhost:3000/reset-password', // Ajusta la URL donde recibes el token
    });
    if (error) throw new BadRequestException(error.message);
    return { message: 'Correo de recuperación enviado', data };
  }

  async updatePassword(token: string, newPassword: string) {
    // 1. Validamos el token e iniciamos sesión
    const { data, error } = await this.supabase.auth.exchangeCodeForSession(token);
    if (error) throw new BadRequestException('Token inválido o expirado');

    // 2. Actualizamos la contraseña
    const { error: updateError } = await this.supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateError) throw new BadRequestException(updateError.message);

    return { message: 'Contraseña actualizada exitosamente' };
  }
  
  
  
}
