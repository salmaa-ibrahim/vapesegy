// src/services/orderService.js
class OrderService {
  constructor() {
    this.orders = [];
  }

  createOrder(orderData) {
    const order = {
      id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.orders.push(order);
    return order;
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find(order => order.id === id);
  }

  // Future: Connect to Supabase
  // async saveOrderToDB(orderData) {
  //   const { data, error } = await supabase
  //     .from('orders')
  //     .insert([orderData])
  //     .select();
  //   if (error) throw error;
  //   return data;
  // }
}

const orderService = new OrderService();
export default orderService;