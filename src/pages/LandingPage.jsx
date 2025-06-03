/** @format */

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useUserContext } from "../context/user-context";
import landingImage from "../assets/landing.jpeg";

const LandingPage = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
              Your Recipe Journey Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Create, share, and discover amazing recipes from around the world.
            </p>
            <div className="flex gap-6">
              {user?._id ? (
                <>
                  <Link
                    to="/add-recipe"
                    className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Add Recipe
                  </Link>
                  <Link
                    to="/explore"
                    className="px-8 py-4 bg-white text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Explore Recipes
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-white text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src={landingImage}
              alt="Delicious Food"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="h-7 w-7 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Create Recipes</h3>
            <p className="text-gray-600">
              Upload and organize your favorite recipes in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="h-7 w-7 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Share with Others</h3>
            <p className="text-gray-600">
              Share your culinary creations with the community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="h-7 w-7 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Save Favorites</h3>
            <p className="text-gray-600">
              Bookmark and collect recipes you love.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join our community of food lovers and share your recipes today.
          </p>
          {user?._id ? (
            <Link
              to="/add-recipe"
              className="px-8 py-4 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Creating Recipes
            </Link>
          ) : (
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started for Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
