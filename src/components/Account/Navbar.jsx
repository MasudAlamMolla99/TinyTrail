import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <>
      <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">Shortly</Typography>
          <Box ml="auto">
            <Button variant="inherit">Links</Button>
            <Button variant="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
