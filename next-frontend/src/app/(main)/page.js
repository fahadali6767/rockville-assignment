// src/app/(main)/page.js
"use client";

import React, { useEffect, useState } from "react";
import RatingComponent from "../components/RatingComponent";

export default function DashboardPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token
    const userDataString = localStorage.getItem("userData"); // Retrieve user data
    const userData = userDataString ? JSON.parse(userDataString) : null; // Move userData inside
    const fetchRecommendations = async () => {
      try {
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_RECOMMENDATION_URL}/recommendations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              favoriteCategories: userData?.favoriteCategories, // Your provided category ID
              token: token,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmitRating = async (movieId, rating) => {
    const token = localStorage.getItem("token");
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (!token || !userData || !userData._id) {
      alert("Authentication information missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: rating,
            user: userData._id,
            movieId: movieId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit rating");
      }

      alert("Rating submitted successfully!");
      // Optionally, you might want to refresh recommendations or update local state
    } catch (error) {
      alert(`Error submitting rating: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Recommended Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map((movie) => (
          <div key={movie._id} className="border p-4 rounded-lg shadow-md">
            <img
              src={movie.imageUrl}
              alt={movie.movieName}
              className="w-full h-auto rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{movie.movieName}</h3>
            <p className="text-sm text-gray-600">{movie.genre}</p>
            <RatingComponent
              movieId={movie._id}
              currentRating={movie.averageRating}
              onRatingSubmit={handleSubmitRating}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
