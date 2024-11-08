import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import AboutPage from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";
import Dashboard from "./pages/Dashboard";
import RoleBasedRoute from "./components/RoleBaseRoute/RoleBaseRoute";
import AccessDenied from "./components/AccessDenied/AccessDenied";
import ThankYouPage from "./pages/ThankYou";
import AddTour from "./pages/AddTours";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tour/:id' element={<TourDetails />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userlist' element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <UserList />
          </RoleBasedRoute>
        } />
        <Route path='/edituser' element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <EditUser />
          </RoleBasedRoute>
        } />
        <Route 
          path="/dashboard" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <Dashboard />
            </RoleBasedRoute>
          } 
        />
        <Route 
          path="/addtours" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AddTour />
            </RoleBasedRoute>
          } 
        />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
