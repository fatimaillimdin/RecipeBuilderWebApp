/** @format */

// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import api, { apiEndPoints } from "../api/api";
import toast from "react-hot-toast";
import { useUserContext } from "../context/user-context";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(apiEndPoints.LOGIN, {
        email: form.email,
        password: form.password,
      });

      const data = response.data;

      if (data) {
        toast.success("Login successful");
        setUser({
          ...data.user,
          token: data.token,
        });
        navigate("/recipes");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <form className="bg-white shadow-xl rounded-2xl p-8 space-y-6" onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
