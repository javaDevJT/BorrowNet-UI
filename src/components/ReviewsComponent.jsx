import React from 'react'

const ReviewsComponent = ({ reviews }) => {
  return (
    <>
    <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <p>Reviewer ID: {review.reviewer_id}</p>
            <p>Rating: {review.rating} / 5</p>
            {review.description && <p>Description: {review.description}</p>}
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </>
  )
}

export default ReviewsComponent