import { Injectable } from '@nestjs/common';
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
    const supabase = this.supabaseService.getClient();
  
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      throw new Error(`Error enviando el correo de recuperación: ${error.message}`);
    }
  
    return { message: 'Correo de recuperación enviado', data };
  }
  
  
  
}
