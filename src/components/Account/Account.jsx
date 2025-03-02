import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
const dummyData = [
  {
    id: "gdjgfsjf",
    createdAt: new Date(),
    name: "My Websites",
    longURL: "https://yoyo.com",
    shortCode: "masdo",
    totalClicks: 100,
  },
  {
    id: "gdjgfs41f",
    createdAt: new Date(),
    name: "My Websites",
    longURL: "https://yoyo.com",
    shortCode: "masdo",
    totalClicks: 100,
  },
];

const Account = () => {
  const [links, serLinks] = useState(dummyData);
  const [openModal, setOPenModal] = useState(false);
  return (
    <>
      {openModal && <ShortenURLModal handleClose={() => setOPenModal(false)} />}
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOPenModal(true)}
                disableElevation
                variant="contained"
                color="primary">
                Create new
              </Button>
            </Box>
            {links.map((link) => (
              <LinkCard key={link.id} {...link} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
