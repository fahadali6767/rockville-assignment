"use client";

import React, { useState } from "react";

const RatingComponent = ({ movieId, currentRating, onRatingSubmit }) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hover, setHover] = useState(0);

  const handleRating = (index) => {
    setRating(index);
    if (onRatingSubmit) {
      onRatingSubmit(movieId, index);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
            }
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star text-2xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default RatingComponent;
