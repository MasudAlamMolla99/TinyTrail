import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Account from "./components/Account/Account";
import theme from "./theme";
import { auth } from "./firebase";
import LinkRedirect from "./components/LinkRedirect";

function App() {
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const [initialload, setInitialload] = useState(
    pathname == "/account" || pathname == "/" ? true : false
  );
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialload(false);
    });
  }, []);

  if (initialload)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <></>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/account" /> : <Home />}
          />
          {/* <Route
              exact
              path="/"
              element={ <Home />}
            /> */}
          <Route
            path="/account"
            element={!user ? <Navigate to="/" /> : <Account />}
          />

          <Route path="/:shortCode" element={<LinkRedirect />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
