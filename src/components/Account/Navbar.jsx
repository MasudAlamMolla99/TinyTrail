import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const handleSignout = async ()=>{
     await signOut(auth)
  }
  return (
    <>
      <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">TinyTrail</Typography>
          <Box ml="auto">
            <Button variant="inherit">Links</Button>
            <Button onClick={handleSignout} variant="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
