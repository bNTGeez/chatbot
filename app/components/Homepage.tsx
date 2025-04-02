"use client";
import React from "react";
import Header from "./Header";
import { Box, Typography, Container, Paper } from "@mui/material";

const Homepage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #0f172a 0%, #1e293b 100%)",
        position: "fixed",
        inset: 0,
        overflow: "auto",
        "&::before": {
          content: '""',
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          p: 3,
        }}
      >
        <Header />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            width: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              padding: "1px",
              background:
                "linear-gradient(45deg, rgba(56, 189, 248, 0.3), rgba(255, 255, 255, 0.1))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: 700,
              letterSpacing: -1,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(45deg, #38bdf8 30%, #818cf8 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(56, 189, 248, 0.3)",
            }}
          >
            JavaScript Assistant
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              mb: 4,
            }}
          >
            Your AI companion for mastering JavaScript. Get instant help with
            concepts, syntax, and best practices from Bro Code&apos;s
            comprehensive tutorial.
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "150%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent)",
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Homepage;
