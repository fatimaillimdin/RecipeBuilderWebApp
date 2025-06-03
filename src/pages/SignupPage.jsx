/** @format */

// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import api, { apiEndPoints } from "../api/api";
import toast from "react-hot-toast";
import { useUserContext } from "../context/user-context";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(apiEndPoints.CREATE_USER, {
        username: form.name,
        email: form.email,
        password: form.password,
      });

      const data = res.data;
      if (data) {
        toast.success("Signup successful");
        setUser({
          ...data.user,
          token: data.token,
        });
        navigate("/search");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-gray-600">Join our community of food lovers</p>
        </div>

        <form className="bg-white shadow-xl rounded-2xl p-8 space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
