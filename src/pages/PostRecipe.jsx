/** @format */

// src/pages/PostRecipe.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api, { apiEndPoints, getAuthHeader } from "../api/api";
import { useUserContext } from "../context/user-context";

const PostRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { user } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.ingredients.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Creating your recipe...");
    setLoading(true);

    try {
      // Convert comma-separated ingredients to array and trim whitespace
      const ingredientsArray = formData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient.length > 0);

      if (ingredientsArray.length === 0) {
        toast.error("Please add at least one ingredient");
        toast.dismiss(loadingToast);
        setLoading(false);
        return;
      }

      const response = await api.post(
        apiEndPoints.RECIPE,
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          ingredients: ingredientsArray,
        },
        getAuthHeader(user.token)
      );

      if (response.data) {
        // Success toast
        toast.success("Recipe created successfully!");
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        // Navigate after a short delay to allow toast to be seen
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      // Error toast
      toast.error(err.response?.data?.message || "Failed to create recipe");
      // Dismiss loading toast
      toast.dismiss(loadingToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter recipe title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={loading}
              rows={4}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Describe your recipe"
            />
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              disabled={loading}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter ingredients separated by commas (e.g., 2 cups flour, 1 cup sugar, 3 eggs)"
            />
            <p className="mt-2 text-sm text-gray-500">Separate ingredients with commas</p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (!loading) {
                  navigate("/dashboard");
                }
              }}
              disabled={loading}
              className={`mr-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Recipe"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostRecipe;
