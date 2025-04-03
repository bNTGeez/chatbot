"use client";
import React from "react";
import Header from "./Header";
import { Box, Typography, Container, Paper } from "@mui/material";

const Homepage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #faf9f6 0%, #f5f5f4 100%)",
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
            "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(245, 245, 244, 0) 70%)",
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
            maxWidth: "800px",
            width: "100%",
            p: 6,
            background: "rgba(252, 252, 250, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(226, 232, 240, 0.8)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              padding: "1px",
              background:
                "linear-gradient(45deg, rgba(56, 189, 248, 0.2), rgba(252, 252, 250, 0.5))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 3,
              background: "linear-gradient(45deg, #0ea5e9 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.05))",
            }}
          >
            JavaScript Assistant
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#475569",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Your AI companion for mastering JavaScript. Get instant help with
            concepts, syntax, and best practices from Bro Code&apos;s
            comprehensive tutorial.
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.2) 50%, transparent 100%)",
              mt: 6,
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Homepage;
