import apiService from "../../services/api"; // Adjust the import path if needed

const cartService = {
  getCart: async () => {
    try {
      const response = await apiService.get('/cart');
      console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  },

  addItem: async (itemData) => {
    try {
      console.log(itemData);
      const response = await apiService.post('/cart/items', itemData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      const response = await apiService.put(`/cart/items/${itemId}`, { quantity });
      console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      const response = await apiService.delete(`/cart/items/${itemId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await apiService.delete('/cart');
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default cartService;

