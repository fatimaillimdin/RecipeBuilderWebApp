/** @format */

import React from "react";

const RecipeCard = ({ recipe, onLike }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-md w-full max-w-md mx-auto mt-4 border border-green-300">
      <h3 className="text-lg font-bold text-orange-600">{recipe.title}</h3>
      <p className="text-sm text-gray-700 mt-1">
        Ingredients: {recipe.ingredients.join(", ")}
      </p>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover mt-2 rounded-md"
        />
      )}
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-700">{recipe.likes} likes</span>
        <button
          onClick={() => onLike(recipe._id)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition"
        >
          Like ❤️
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
