// src/services/orderService.js
import { supabase } from '../lib/supabase.js';

class OrderService {
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: orderData.customerName,
          phone: orderData.phone,
          whatsapp: orderData.whatsapp,
          address: orderData.address,
          address_details: orderData.addressDetails,
          items: orderData.items,
          total: orderData.total,
          status: 'pending',
        },
      ])
      // .select()
      // .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return data;
  }
}

const orderService = new OrderService();

export default orderService;