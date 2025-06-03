/** @format */

import { Link } from "react-router";
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";

export default function PostCard({ recipe }) {
  return (
    <div className="card group bg-white shadow-md rounded-lg p-4 h-full flex flex-col justify-between">
      <Link to={`/recipe/${recipe.id}`} className="block">
        {/* Title */}
        <h3 className="text-lg font-semibold text-orange-600 mb-2 line-clamp-2">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {recipe.description}
        </p>

        {/* Meta info: author & likes */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            {recipe.author}
          </span>
          <span className="flex items-center">
            <HeartIcon className="h-4 w-4 mr-1" />
            {recipe.likes}
          </span>
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
