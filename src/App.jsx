import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Auth";
import LoginPencari from "./pages/pencariLahan/LoginPencari";
import LoginPemilik from "./pages/pemilikLahan/LoginPemilik";
import DashboardPencari from "./pages/pencariLahan/DashboardPencari";
import DashboardPemilik from "./pages/pemilikLahan/DashboardPemilik";
import RegisterPencari from "./pages/pencariLahan/RegisterPencari";
import RegisterPemilik from "./pages/pemilikLahan/RegisterPemilik";
import DaftarLahan from "./pages/pemilikLahan/daftarLahan/DaftarLahan";
import LandingPage from "./pages/LandingPage";
import EditLahan from "./pages/pemilikLahan/daftarLahan/EditLahan";
import Katalog from "./pages/pemilikLahan/Katalog";
import DetailLahan from "./pages/pemilikLahan/DetailLahan";
import Profile from "./pages/pemilikLahan/Profile";
import ProfilePencari from "./pages/pencariLahan/Profile";

import KatalogLahan from "./pages/pencariLahan/Katalog";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const { role } = JSON.parse(atob(token.split(".")[1]));
    return role;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

const RedirectIfLoggedIn = ({ children }) => {
  if (isLoggedIn()) {
    const role = getRole();
    if (role === "pencari") {
      return <Navigate to="/dashboard-pencari" replace />;
    } else if (role === "pemilik") {
      return <Navigate to="/dashboard-pemilik" replace />;
    }
  }
  return children;
};

const ProtectedRoute = ({ role, children }) => {
  if (!isLoggedIn() || getRole() !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (

    <Routes>
      {/* Rute Umum */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/auth"
        element={
          <RedirectIfLoggedIn>
            <Home />
          </RedirectIfLoggedIn>
        }
      />
      <Route
        path="/login-pencari-lahan"
        element={
          <RedirectIfLoggedIn>
            <LoginPencari />
          </RedirectIfLoggedIn>
        }
      />
      <Route
        path="/login-pemilik-lahan"
        element={
          <RedirectIfLoggedIn>
            <LoginPemilik />
          </RedirectIfLoggedIn>
        }
      />
      <Route path="/register-pencari-lahan" element={<RegisterPencari />} />
      <Route path="/register-pemilik-lahan" element={<RegisterPemilik />} />
      

      {/* Rute Khusus Pencari Lahan */}
      <Route
        path="/dashboard-pencari"
        element={
          <ProtectedRoute role="pencari">
            <DashboardPencari />
          </ProtectedRoute>
        }
      />

      <Route
        path="/katalog-lahan"
        element={
          <ProtectedRoute role="pencari">
            <KatalogLahan />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detail-lahan/:id"
        element={
          <DetailLahan />
        }
      />

      <Route
        path="/profile-pencari"
        element={
          <ProtectedRoute role="pencari">
            <ProfilePencari />
          </ProtectedRoute>
        }
      />

      {/* Rute Khusus Pemilik Lahan */}
      <Route
        path="/dashboard-pemilik"
        element={
          <ProtectedRoute role="pemilik">
            <DashboardPemilik />
          </ProtectedRoute>
        }
      />

      <Route
        path="/daftar-lahan"
        element={
          <ProtectedRoute role="pemilik">
            <DaftarLahan />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-lahan/:id"
        element={
          <ProtectedRoute role="pemilik">
            <EditLahan />
          </ProtectedRoute>
        }
      />

      <Route
        path="/katalog-pemilik"
        element={
          <ProtectedRoute role="pemilik">
            <Katalog />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/profile-pemilik"
        element={
          <ProtectedRoute role="pemilik">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Rute 404 */}
      <Route path="*" element={
        <div>
          <h1>404 Not Found</h1>
        </div>
      } />
    </Routes>
  );
}

export default App;
