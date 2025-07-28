import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donor from "./pages/Dashboard/Donor";
import Hospital from "./pages/Dashboard/Hospital";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonorList from "./pages/Admin/DonorList"
import OrgList from "./pages/Admin/OrgList";
import HospitalList from "./pages/Admin/HospitalList"
import AdminHome from "./pages/Admin/AdminHome";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/admin"
          element={<ProtectedRoute>{<AdminHome />}</ProtectedRoute>}
        />
        <Route
          path="/donor-list"
          element={<ProtectedRoute>{<DonorList />}</ProtectedRoute>}
        />
        <Route
          path="/hospital-list"
          element={<ProtectedRoute>{<HospitalList/>}</ProtectedRoute>}
        />
        <Route
          path="/org-list"
          element={<ProtectedRoute>{<OrgList />}</ProtectedRoute>}
        />
        <Route
          path="/"
          element={<ProtectedRoute>{<HomePage />}</ProtectedRoute>}
        />
        <Route
          path="/donor"
          element={<ProtectedRoute>{<Donor/>}</ProtectedRoute>}
        />
        <Route
          path="/hospital"
          element={<ProtectedRoute>{<Hospital/>}</ProtectedRoute>}
        />
        <Route
          path="/organisation"
          element={<ProtectedRoute>{<Organisation/>}</ProtectedRoute>}
        />
        <Route
          path="/consumer"
          element={<ProtectedRoute>{<Consumer/>}</ProtectedRoute>}
        />
        <Route
          path="/donation"
          element={<ProtectedRoute>{<Donation/>}</ProtectedRoute>}
        /> 
        <Route
          path="/analytics"
          element={<ProtectedRoute><Analytics/></ProtectedRoute>}
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
