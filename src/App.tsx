import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import FavoritePage from "./pages/favoritePage";
import "./App.css";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

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
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
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
    </MuiThemeProvider>
  );
}

export default App;
