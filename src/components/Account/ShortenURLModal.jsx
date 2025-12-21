import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ShortenURLModal = ({ handleClose, createShortenLink }) => {
  const [form, setForm] = useState({
    name: "",
    longURL: "",
  });
  const handleSubmit = async () => {
    createShortenLink(form.name, form.longURL);
    console.log(form.name);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>
        <Box
          display="flex"
          alignContent="center"
          justifyContent="space-between"
        >
          Create Short URL
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            value={form.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="filled"
            label="Name"
          />
        </Box>
        <TextField
          value={form.longURL}
          name="longURL"
          onChange={handleChange}
          fullWidth
          variant="filled"
          label="Long URL"
        />
      </DialogContent>
      <DialogActions>
        <Box mr={2}>
          <Button
            onClick={handleSubmit}
            disableElevation
            variant="contained"
            color="primary"
          >
            Shorten URL
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;
