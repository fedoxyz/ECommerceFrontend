import apiService from "../../services/api"; // Adjust the import path if needed

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await apiService.get('/categories');
      return response;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await apiService.post('/categories', categoryData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getCategoryById: async (categoryId) => {
    try {
      const response = await apiService.get(`/categories/${categoryId}`, { quantity });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await apiService.put(`/categories/${categoryId}`, categoryData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  removeCategory: async (categoryId) => {
    try {
      const response = await apiService.delete(`/categories/${categoryId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default categoryService;
