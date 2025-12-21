import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { auth, firestore } from "../../firebase";
import copy from "copy-to-clipboard";
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
  const [links, setLinks] = useState();
  const [openModal, setOPenModal] = useState(false);
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const linkPathRef = collection(
    firestore,
    "users",
    auth.currentUser.uid,
    "links"
  );
  const handleShortenUrl = async (name, longURL) => {
    if (!auth.currentUser) return;

    if (typeof longURL !== "string") {
      console.error("Invalid URL");
      return;
    }

    const link = {
      name,
      longURL,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    const resp = await addDoc(linkPathRef, link);
    setLinks((links) => [
      ...links,
      { ...link, createdAt: new Date(), id: resp.id },
    ]);
    setOPenModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(linkPathRef);
      const tempLinks = [];
      snapshot.forEach((doc) =>
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );
      setLinks(tempLinks);
      console.log(tempLinks);
    };
    fetch();
  }, []);
  const handleDeleteLink = useCallback(async (linkId) => {
    const docRef = doc(linkPathRef, linkId);
    await deleteDoc(docRef);
    setLinks((oldLinks) => oldLinks.filter((link) => link.id != linkId));
  }, []);
  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkToaster(true);
  }, []);
  return (
    <>
      <Snackbar
        open={newLinkToaster}
        onClose={() => setNewLinkToaster(false)}
        autoHideDuration={2000}
        message="Link copied to the clipboard"
      />
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleShortenUrl}
          handleClose={() => setOPenModal(false)}
        />
      )}
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
            {links &&
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt - prevLink.createdAt
                )
                .map((link, idx) => (
                  <>
                    <LinkCard
                      key={link.id}
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                    />

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
