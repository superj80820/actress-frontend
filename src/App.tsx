import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import ImageSearchPage from "./pages/imageSearchPage";
import createActressAPIRepo, { createMockActressAPIRepo } from "./repository/actress-api";
import createAuthAPIRepo from './repository/auth-api';
import CssBaseline from "@material-ui/core/CssBaseline";
import FavoritePage from "./pages/favoritePage";
import NameSearchPage from "./pages/nameSearchPage";
import "./App.css";
import { ENV } from './config';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { ImageSearch } from './components/ImageSearch';
import { NameSearch } from './components/NameSearch';
import { Favorites } from './components/Favorites';

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: "linear-gradient(109.6deg, rgb(255, 221, 225) 11.2%, rgb(255, 255, 255) 92.2%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  }
});

function App() {
  const authAPIRepo = createAuthAPIRepo()
  const actressAPIRepo = ENV === "development" ? createMockActressAPIRepo() : createActressAPIRepo()
  const imageSearch = () => ImageSearch({ actressAPIRepo: actressAPIRepo })
  const nameSearch = () => NameSearch({ actressAPIRepo: actressAPIRepo })
  const favorites = () => Favorites({ actressAPIRepo: actressAPIRepo })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider authAPIRepo={authAPIRepo} env={ENV}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/imageSearch" element={<ImageSearchPage imageSearch={imageSearch} />} />
            <Route path="/nameSearch" element={<NameSearchPage nameSearch={nameSearch} />} />
            <Route path="/favorite" element={<FavoritePage favorites={favorites} />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
