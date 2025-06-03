/** @format */
import React from "react";
import { useUserContext } from "../context/user-context";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg border border-orange-100">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
            <p className="mt-1 text-lg text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-8 grid gap-6 border-t border-orange-100 pt-8">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium font-mono text-sm">{user._id}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="font-medium">Active</p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 pt-6 border-t border-orange-100 text-sm text-gray-500">
          Last updated:{" "}
          {new Date(user.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
