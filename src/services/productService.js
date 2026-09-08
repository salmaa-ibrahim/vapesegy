// src/services/productService.js
import { supabase } from "../lib/supabase.js";
import productSectionsData from "../data/productSections.js";

class ProductService {
  constructor() {
    this.sections = productSectionsData;
  }


  getProductSections() {
    return this.sections
      .filter((section) => section.active)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  getSectionById(id) {
    return this.sections.find((section) => section.id === id);
  }


  // Method to be replaced with API call when database is connected
  async fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data;
  }

  // Future: Connect to Supabase
  // async fetchProductsFromDB() {
  //   const { data, error } = await supabase
  //     .from('products')
  //     .select('*');
  //   if (error) throw error;
  //   return data;
  // }
}

const productService = new ProductService();
export default productService;
