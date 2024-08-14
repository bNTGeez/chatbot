"use client"
import React from "react";
import Header from "./Header.js"
import { Box, Typography } from "@mui/material";

const Homepage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('/backgroundImage.avif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers content horizontally
      }}
    >
      <Box sx={{
          position: 'absolute', // Position Header absolutely
          top: 0,               // Align to the top
          left: 0,              // Align to the left
          width: 'auto',        // Only as wide as needed
          zIndex: 10            // Ensure it's on top of other content if overlapping
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          p: 3, // Adds padding around the text for spacing
          textShadow: '0px 0px 8px rgba(0,0,0,0.7)', // Text shadow for better readability
          maxWidth: "600px", // Restricts max width for better reading experience
        }}
      >
        <Typography variant="h3" gutterBottom>
          Bro Code Javascript Support AI
        </Typography>
        <Typography variant="h6">
          Based off of Bro Code's 12 Hour Javascript Tutorial, you may ask this
          support bot any clarifying questions you may have.
        </Typography>
      </Box>
    </Box>
  );
};

export default Homepage;
