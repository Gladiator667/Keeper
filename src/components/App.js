import React from "react";
import SignUp from "./SignUp";
import AuthProvider from "../context/authContext"
import {Route, Routes } from "react-router-dom"
import LogIn from "./LogIn";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";

function App() {
  return (
    <>
    <AuthProvider>
    <Header />

      <Routes>
      
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
    
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/" element={<LogIn />}/>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
