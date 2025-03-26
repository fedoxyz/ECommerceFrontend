import React, { useEffect, useState } from "react";
import reviewService from "../reviewService";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = async (productId, currentPage, limit=10) => {
    try {
      setLoading(true);
      const response = await reviewService.getReviewsForProduct(productId, currentPage, limit);
      console.log(response) 
      if (response.totalPages === currentPage) {
        setHasMore(false);
      }

      // If it's the first page, replace reviews
      // If it's a subsequent page, append reviews
      setReviews(prevReviews => 
        currentPage === 1 ? response.reviews : [...prevReviews, ...response.reviews]
      );
      
      setError(null);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews(productId, page);
    }
  }, [productId, page]);

  const loadMoreReviews = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating);
  };

  if (loading && reviews.length === 0) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;

  return (
    <div className="product-reviews">
      <h2>Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <>
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review.authorName}</span>
                <span className="review-rating">{renderStars(review.rating)}</span>
              </div>
              <p className="review-text">{review.comment}</p>
              <small className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
          
          {hasMore && (
            <button 
              onClick={loadMoreReviews} 
              disabled={loading}
              className="load-more-reviews"
            >
              {loading ? 'Loading...' : 'Load More Reviews'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductReviews;
