/** @format */

import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onLike }) => {
  return (
    <div className="flex flex-col items-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} onLike={onLike} />
      ))}
    </div>
  );
};

export default RecipeList;
