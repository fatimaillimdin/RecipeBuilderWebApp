/** @format */
import React, { useEffect, useState } from "react";
import api, { apiEndPoints, getAuthHeader } from "../api/api";
import { useUserContext } from "../context/user-context";

export default function MyPosts() {
  const { user } = useUserContext();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        apiEndPoints.RECIPE,
        getAuthHeader(user.token)
      );
      const dataWithLikesCount = response.data.map((recipe) => ({
        ...recipe,
        likes: recipe.likes.length,
      }));
      setRecipes(dataWithLikesCount);
    } catch (err) {
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchRecipes();
  }, [user]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await api.delete(
        apiEndPoints.RECIPE_DELETE(id),
        getAuthHeader(user.token)
      );
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (err) {
      alert("Failed to delete recipe");
    }
  };

  return (
    <div className="my-posts-container">
      <h1 className="my-posts-header">My Recipes</h1>
      <div className="my-posts-grid">
        {loading ? (
          <div className="status-message">Loading your recipes...</div>
        ) : error ? (
          <div className="status-message error">{error}</div>
        ) : recipes.length === 0 ? (
          <p className="my-posts-empty">You haven't posted any recipes yet.</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="my-posts-card"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <h2 className="my-posts-title">{recipe.title}</h2>
              <p className="my-posts-description">
                {recipe.description.length > 100
                  ? recipe.description.slice(0, 100) + "..."
                  : recipe.description}
              </p>
              <div className="my-posts-meta">
                <span className="username">
                  {recipe.user?.username || "You"}
                </span>
                <span className="separator">·</span>
                <span className="likes" title={`${recipe.likes} likes`}>
                  <svg
                    className="heart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FF0000"
                    aria-label="likes"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3
                             7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3
                             19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  {recipe.likes}
                </span>
              </div>
              <button
                className="my-posts-delete-button"
                onClick={(e) => handleDelete(recipe._id, e)}
                aria-label={`Delete recipe ${recipe.title}`}
                title="Delete recipe"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#FF0000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close modal"
            >
              ✖
            </button>

            <h2 className="modal-title">{selectedRecipe.title}</h2>

            <section className="modal-section">
              <h3 className="modal-heading">Description</h3>
              <p className="modal-text">{selectedRecipe.description}</p>
            </section>

            <section className="modal-section">
              <h3 className="modal-heading">Ingredients</h3>
              <ul className="modal-list">
                {(selectedRecipe.ingredients || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

        .my-posts-container {
          max-width: 1100px;
          margin: 3rem auto;
          padding: 0 1.5rem;
          font-family: "Roboto", sans-serif;
          color: #000;
          background: #f8f9fa;
        }

        .my-posts-header {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2.5rem;
          color: #000000; /* black */
          letter-spacing: 0.03em;
          user-select: none;
        }

        .my-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.25rem;
        }

        .my-posts-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.75rem 1.5rem 2.5rem;
          position: relative;
          box-shadow: 0 4px 10px rgba(128, 128, 128, 0.2);
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 230px;
        }

        .my-posts-card:hover {
          box-shadow: 0 8px 20px rgba(128, 128, 128, 0.3);
          transform: translateY(-4px);
        }

        .my-posts-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #f97316;
          line-height: 1.3;
        }

        .my-posts-description {
          font-size: 1rem;
          color: #000;
          flex-grow: 1;
          margin-bottom: 1.25rem;
          line-height: 1.4;
          user-select: text;
        }

        .my-posts-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #444;
          user-select: none;
        }
        .username {
          color: #222;
        }
        .separator {
          user-select: none;
          color: #ccc;
        }
        .likes {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #ff0000;
          font-weight: 600;
        }
        .heart-icon {
          width: 18px;
          height: 18px;
          fill: #ff0000;
        }

        .my-posts-delete-button {
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
          background-color: transparent;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s ease;
        }
        .my-posts-delete-button:hover {
          transform: scale(1.2);
        }
        .my-posts-delete-button svg {
          stroke: #ff0000;
          stroke-width: 2.5;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          padding: 1rem;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: #ffffff;
          border-radius: 1rem;
          padding: 2.5rem 2.5rem 3rem;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          position: relative;
          font-family: "Roboto", sans-serif;
          color: #000;
          user-select: text;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          font-size: 1.6rem;
          font-weight: 700;
          color: #888;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s ease;
          line-height: 1;
        }
        .modal-close:hover {
          color: #ff0000;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #f97316;
          user-select: none;
        }

        .modal-section {
          margin-top: 1.8rem;
        }

        .modal-heading {
          font-weight: 700;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #000;
          user-select: none;
        }

        .modal-text {
          font-size: 1rem;
          color: #333;
          line-height: 1.5;
          white-space: pre-wrap;
          user-select: text;
        }

        .modal-list {
          padding-left: 1.5rem;
          color: #333;
          font-size: 1rem;
          line-height: 1.5;
          user-select: text;
        }

        .status-message {
          font-size: 1.2rem;
          color: #555;
          text-align: center;
          grid-column: 1 / -1;
          user-select: none;
        }

        .status-message.error {
          color: #ff0000;
        }

        .my-posts-empty {
          font-size: 1.25rem;
          color: #666;
          text-align: center;
          grid-column: 1 / -1;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
