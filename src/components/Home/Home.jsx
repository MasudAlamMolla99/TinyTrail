import { Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Home = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      // console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <>
      <Typography>Home</Typography>
      <TextField
        value={form.email}
        name="email"
        onChange={handleChange}
        label="Email"
      />
      <TextField
        value={form.password}
        name="password"
        onChange={handleChange}
        label="Password"
        type="password"
      />
      <Button onClick={handleSignup}>Sign Up</Button>
    </>
  );
};

export default Home;
