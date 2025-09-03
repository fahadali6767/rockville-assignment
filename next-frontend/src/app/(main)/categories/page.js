"use client";

import React, { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null); // New state for editing category
  const [newCategoryName, setNewCategoryName] = useState(""); // New state for new category name

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setEditingCategory(category._id);
    setNewCategoryName(category.categoryName);
  };

  const handleUpdateCategory = async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/update/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ categoryName: newCategoryName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      alert("Category updated successfully!");
      setEditingCategory(null); // Exit edit mode
      setNewCategoryName("");
      // Refresh categories after update
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
      );
      const updatedData = await updatedResponse.json();
      setCategories(updatedData);
    } catch (err) {
      setError(err.message);
      alert(`Error updating category: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li
              key={category._id}
              className="mb-2 p-2 border rounded-md flex justify-between items-center"
            >
              {editingCategory === category._id ? (
                <div className="flex-grow flex items-center">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="border rounded-md px-2 py-1 flex-grow mr-2"
                  />
                  <button
                    onClick={() => handleUpdateCategory(category._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="ml-2 bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{category.categoryName}</span>
                  <button
                    onClick={() => handleEditClick(category)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}
