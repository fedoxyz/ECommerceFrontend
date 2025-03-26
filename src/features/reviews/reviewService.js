import apiService from "../../services/api"; // Adjust the import path if needed

const reviewService = {
  createReview: async (reviewData) => {
    try {
      const response = await apiService.post("/reviews", reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  getReviewsForProduct: async (productId, page, limit) => {
    try {
      const response = await apiService.get(`/reviews/product/${productId}`, {
        params: {
          page,
          limit
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  getReviewById: async (reviewId) => {
    try {
      const response = await apiService.get(`/reviews/${reviewId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await apiService.put(`/reviews/${reviewId}`, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  deleteReview: async (reviewId) => {
    try {
      const response = await apiService.delete(`/reviews/${reviewId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default reviewService;
