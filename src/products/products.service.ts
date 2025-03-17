import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ProductsService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


  async getProducts() {
    const { data, error } = await this.supabase.from('products').select('*');
    if (error) throw error;
    return data;
  }

  async addProduct(product: { name: string; price: number; image: string }) {
    const { data, error } = await this.supabase.from('products').insert([product]);
    if (error) throw error;
    return data;
  }
  async getProductById(id: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
