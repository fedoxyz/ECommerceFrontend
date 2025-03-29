import apiService from "../../services/api"; 

const orderService = {
  getUserOrders: async (page = 1, limit = 10) => {
    try {
      const response = await apiService.get(`/orders?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await apiService.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await apiService.post('/orders', orderData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiService.put(`/orders/${orderId}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
