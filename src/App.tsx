import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";
import FavoritePage from "./pages/favoritePage";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
