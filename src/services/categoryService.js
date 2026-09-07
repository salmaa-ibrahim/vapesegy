// src/services/categoryService.js
import categoriesData from '../data/categories.js';

class CategoryService {
  constructor() {
    this.categories = categoriesData;
  }

  getAllCategories() {
    return this.categories;
  }

  getCategoryBySlug(slug) {
    return this.categories.find(category => category.slug === slug);
  }

  getCategoryById(id) {
    return this.categories.find(category => category.id === id);
  }

  // Future: Connect to Supabase
  // async fetchCategoriesFromDB() {
  //   const { data, error } = await supabase
  //     .from('categories')
  //     .select('*');
  //   if (error) throw error;
  //   return data;
  // }
}

const categoryService = new CategoryService();
export default categoryService;