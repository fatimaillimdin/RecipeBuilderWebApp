/** @format */

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { UserContextProvider, useUserContext } from "./context/user-context";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Profile from "./pages/Profile";
import PostRecipe from "./pages/PostRecipe";
import SearchRecipes from "./pages/SearchRecipes";
import MyPosts from "./pages/MyPosts";

import { Toaster } from "react-hot-toast";

const PrivateRoute = () => {
  const { user } = useUserContext();
  return user?._id ? <Outlet /> : <Navigate to="/login" />;
};

const AuthRoutes = () => {
  const { user } = useUserContext();
  return !user?._id ? <Outlet /> : <Navigate to="/recipes" />;
};

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Layout>
          <Toaster position="top-right" />
          <Routes>
            {/* Public route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />

            {/* Auth-only routes */}
            <Route element={<AuthRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/recipes" element={<SearchRecipes />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post" element={<PostRecipe />} />
              <Route path="/myposts" element={<MyPosts />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
