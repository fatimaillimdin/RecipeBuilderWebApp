/** @format */

import React, { useState } from "react";

const RecipePostForm = ({ onPost }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPost({ title, ingredients: ingredients.split(","), image });
    setTitle("");
    setIngredients("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-beige p-4 shadow-md rounded-md w-full max-w-md mx-auto my-6"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma-separated)"
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        className="block w-full mb-2 p-2"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Post Recipe
      </button>
    </form>
  );
};

export default RecipePostForm;
