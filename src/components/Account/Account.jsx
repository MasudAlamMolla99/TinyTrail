import { Grid, Box, Typography, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
import { serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
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
  const handleShortenUrl = async (name, longURL) => {
    const link = {
      name,
      longURL,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };
  };
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
                color="primary"
              >
                Create new
              </Button>
            </Box>
            {links.map((link, idx) => (
              <>
                <LinkCard key={link.id} {...link} />

                {idx !== links.length - 1 && <Divider />}
              </>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
