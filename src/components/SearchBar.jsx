/** @format */

import React, { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cookingTime: 'any',
    difficulty: 'any',
    dietary: [],
  });

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Low-Carb',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, ...filters });
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleDietaryToggle = (option) => {
    const newDietary = filters.dietary.includes(option)
      ? filters.dietary.filter((item) => item !== option)
      : [...filters.dietary, option];
    
    handleFilterChange('dietary', newDietary);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 pr-4 py-3 w-full"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cooking Time Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooking Time
                </label>
                <select
                  value={filters.cookingTime}
                  onChange={(e) => handleFilterChange('cookingTime', e.target.value)}
                  className="input"
                >
                  <option value="any">Any time</option>
                  <option value="15">Under 15 mins</option>
                  <option value="30">Under 30 mins</option>
                  <option value="60">Under 1 hour</option>
                  <option value="more">Over 1 hour</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="input"
                >
                  <option value="any">Any difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Restrictions
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleDietaryToggle(option)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        filters.dietary.includes(option)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
