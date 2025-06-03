/** @format */

import React, { useState, useCallback } from "react";
import { useUserContext } from "../context/user-context";
import api, { apiEndPoints, getAuthHeader } from "../api/api";
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";

const LoadingRecipeCard = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-4 animate-pulse">
    <div className="space-y-4 py-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

const RecipeModal = ({ recipe, onClose, onToggleLike }) => {
  if (!recipe) return null;

  const userLiked = recipe.likes?.includes(recipe.currentUserId);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
            <div className="flex items-center gap-4">
              {/* Like toggle button with count */}
              <button
                onClick={onToggleLike}
                className={`p-2 rounded-full hover:bg-white/80 transition-colors duration-200 ${
                  userLiked ? "text-red-500" : "text-gray-400"
                } flex items-center gap-1`}
                aria-label="Toggle like recipe"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                <span className="text-lg font-semibold">
                  {recipe.likes?.length || 0}
                </span>
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/80 transition-colors duration-200 text-gray-500"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ingredients
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {recipe.instructions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Instructions
                </h3>
                <div className="text-gray-600 whitespace-pre-line">
                  {recipe.instructions}
                </div>
              </div>
            )}

            {recipe.cookingTime && (
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Cooking Time: {recipe.cookingTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchRecipes = () => {
  const { user } = useUserContext();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setRecipes([]);
        return;
      }

      setIsLoading(true);
      try {
        const ingredients = searchQuery
          .split(",")
          .map((ingredient) => ingredient.trim())
          .filter((ingredient) => ingredient.length > 0);

        const response = await api.post(
          apiEndPoints.RECIPE_SEARCH,
          { ingredients },
          getAuthHeader(user?.token)
        );

        // Append currentUserId to each recipe for modal use
        const recipesWithUser = response.data.map((r) => ({
          ...r,
          currentUserId: user?._id,
        }));

        setRecipes(recipesWithUser);
      } catch (error) {
        toast.error("Failed to search recipes");
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [user?._id, user?.token]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleToggleLike = async (recipeId) => {
    if (!user?._id) {
      toast.error("Please login to like recipes");
      return;
    }

    const recipe = recipes.find((r) => r._id === recipeId);
    if (!recipe) return;

    const userLiked = recipe.likes?.includes(user._id);

    try {
      // Call like/unlike endpoint (your backend should handle toggle)
      // If your backend doesn't support toggle, you might need separate like/unlike endpoints.
      await api.post(
        apiEndPoints.RECIPE_LIKE(recipeId),
        {},
        getAuthHeader(user.token)
      );

      // Optimistically update likes locally
      const updatedLikes = userLiked
        ? recipe.likes.filter((id) => id !== user._id) // Remove like
        : [...(recipe.likes || []), user._id]; // Add like

      setRecipes((prevRecipes) =>
        prevRecipes.map((r) =>
          r._id === recipeId
            ? { ...r, likes: updatedLikes, currentUserId: user._id }
            : r
        )
      );

      if (selectedRecipe?._id === recipeId) {
        setSelectedRecipe((prev) => ({
          ...prev,
          likes: updatedLikes,
          currentUserId: user._id,
        }));
      }

      toast.success(userLiked ? "Like removed" : "Recipe liked!");
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover <span className="text-orange-500">Delicious</span> Recipes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search through our collection of recipes by ingredients
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Enter ingredients separated by commas (e.g. chicken, rice, tomatoes)"
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg
                className="animate-spin h-5 w-5 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
              >
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
            </div>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {isLoading ? (
          <>
            <LoadingRecipeCard />
            <LoadingRecipeCard />
            <LoadingRecipeCard />
          </>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => {
            const userLiked = recipe.likes?.includes(user?._id);
            return (
              <div
                key={recipe._id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                  {/* Like button + likes count */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLike(recipe._id);
                      }}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                        userLiked ? "text-red-500" : "text-gray-400"
                      }`}
                      aria-label="Toggle like recipe"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </button>
                    <span className="text-gray-600 text-sm">
                      {recipe.likes?.length || 0}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-1">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-100 text-orange-700 rounded px-2 py-0.5"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          query.trim() && (
            <p className="text-center text-gray-500">
              No recipes found for these ingredients.
            </p>
          )
        )}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onToggleLike={() => handleToggleLike(selectedRecipe._id)}
        />
      )}
    </div>
  );
};

export default SearchRecipes;
