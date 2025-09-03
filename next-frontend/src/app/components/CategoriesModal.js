"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function CategoriesModal({ onClose }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (!token || !userData || !userData._id) {
      alert("Authentication information missing. Please log in again.");
      router.push("/login");
      onClose();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/category/add`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoriesId: selectedCategories,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update categories");
      }

      const updatedUser = await response.json();
      localStorage.setItem("userData", JSON.stringify(updatedUser)); // Assuming API returns updated user data as { user: ... }
      router.push("/"); // Redirect after successful submission
      onClose();
    } catch (err) {
      setError(err.message);
      alert(`Error saving categories: ${err.message}`);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Select Your Favorite Categories
          </h3>
          <div className="mt-2 px-7 py-3">
            {categories.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category._id}`}
                      value={category._id}
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCheckboxChange(category._id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="ml-2 text-gray-700"
                    >
                      {category.categoryName}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No categories found.</p>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="submit-btn"
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
