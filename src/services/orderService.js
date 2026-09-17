// // src/services/orderService.js
// import { supabase } from "../lib/supabase.js";

// class OrderService {
//   async createOrder(orderData) {
//     const { data, error } = await supabase.from("orders").insert([
//       {
//         customer_name: orderData.customerName,
//         phone: orderData.phone,
//         whatsapp: orderData.whatsapp,
//         address: orderData.address,
//         address_details: orderData.addressDetails,
//         items: orderData.items,
//         subtotal: orderData.subtotal,
//         shipping_fee: orderData.shipping_fee,
//         total: orderData.total,
//         status: "pending",
//       },
//     ]);
//     // .select()
//     // .single();

//     if (error) {
//       console.error("Error creating order:", error);
//       throw error;
//     }

//     return data;
//   }
// }

// const orderService = new OrderService();

// export default orderService;


// src/services/orderService.js
import { supabase } from "../lib/supabase.js";

class OrderService {
  async createOrder(orderData) {
    const { data, error } = await supabase.from("orders").insert([
      {
        customer_name: orderData.customerName,
        phone: orderData.phone,
        whatsapp: orderData.whatsapp,
        address: orderData.address,
        address_details: orderData.addressDetails,
        items: orderData.items,
        subtotal: orderData.subtotal,
        shipping_method: orderData.shipping_method,   // ✅ العمود الجديد
        shipping_fees: orderData.shipping_fee,        // ✅ mapping صح (fees بالجمع)
        total: orderData.total,
        status: "pending",
      },
    ]);
    // .select()
    // .single();

    if (error) {
      console.error("Error creating order:", error);
      throw error;
    }

    return data;
  }
}

const orderService = new OrderService();

export default orderService;