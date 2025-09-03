"use client";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(""); // To store the URL of the profile image
  const [selectedImageFile, setSelectedImageFile] = useState(null); // To store the file object for upload
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDataString = localStorage.getItem("userData");
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (!token || !userData || !userData._id) {
          setError("Authentication information missing. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userData._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user profile");
        }

        const userProfile = await response.json();
        setName(userProfile.name || "");
        setDateOfBirth(userProfile.dateOfBirth || "");
        setAddress(userProfile.address || "");
        setProfileImage(userProfile.profileImage || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImageFile(event.target.files[0]);
      setProfileImage(URL.createObjectURL(event.target.files[0])); // Show a preview
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if (!token || !userData || !userData._id) {
        alert("Authentication information missing. Please log in again.");
        setLoading(false);
        return;
      }

      let imageUrlToSave = profileImage; // Default to existing image

      if (selectedImageFile) {
        const formData = new FormData();
        formData.append("file", selectedImageFile);

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              // "Content-Type": "multipart/form-data", // This header is automatically set by fetch when using FormData
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "Failed to upload image");
        }

        const uploadResult = await uploadResponse.json();
        const filename = uploadResult.filename; // Assuming the API returns a filename
        imageUrlToSave = `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${filename}`;
      }

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            dateOfBirth: dateOfBirth,
            address: address,
            profileImage: imageUrlToSave,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      alert("Profile updated successfully!");
      // Optionally, update localStorage.userData if the API returns updated user data
    } catch (err) {
      setError(err.message);
      alert(`Error updating profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="mt-4 w-32 h-32 rounded-full object-cover mx-auto"
              />
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
