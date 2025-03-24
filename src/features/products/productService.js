import apiService from "../../services/api"; // Adjust the import path if needed

const productService = {
  getAllProducts: async (paramsData) => {
    try {
      const response = await apiService.get("/products", { params: paramsData });
      return response;
    } catch (error) {
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await apiService.post("/products", productData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await apiService.get(`/products/${productId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await apiService.put(`/products/${productId}`, productData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  removeProduct: async (productId) => {
    try {
      const response = await apiService.delete(`/products/${productId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;

