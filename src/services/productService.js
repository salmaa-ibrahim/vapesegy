// src/services/productService.js
import productsData from '../data/products.js';
import productSectionsData from '../data/productSections.js';

class ProductService {
  constructor() {
    this.products = productsData;
    this.sections = productSectionsData;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(categoryId) {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  getAvailableProducts() {
    return this.products.filter(product => product.available);
  }

  getProductSections() {
    return this.sections.filter(section => section.active)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  getSectionById(id) {
    return this.sections.find(section => section.id === id);
  }

  getProductsForSection(sectionId) {
    const section = this.getSectionById(sectionId);
    if (!section) return [];
    return this.getProductsByCategory(section.categoryId);
  }

  // Method to be replaced with API call when database is connected
  async fetchProducts() {
    // For now, return local data
    return this.products;
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