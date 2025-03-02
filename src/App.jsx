import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Account from "./components/Account/Account";
import theme from "./theme";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [initialload, setInitialload] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialload(false);
    });
  }, []);
  console.log(user);
  if (initialload)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Navigate to="/account" /> : <Home />}
            />

            <Route
              path="/account"
              element={!user ? <Navigate to="/" /> : <Account />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
