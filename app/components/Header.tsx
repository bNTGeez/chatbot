"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Stack } from "@mui/material";
import { Home, MessageSquare } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="text"
          onClick={() => router.push("/")}
          startIcon={<Home size={20} strokeWidth={1.5} />}
          sx={{
            color: "#475569",
            textTransform: "none",
            fontSize: "1rem",
            px: 2,
            py: 1,
            "&:hover": {
              background: "rgba(56, 189, 248, 0.08)",
            },
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push("/chat")}
          startIcon={<MessageSquare size={20} strokeWidth={1.5} />}
          sx={{
            background: "linear-gradient(45deg, #0ea5e9, #3b82f6)",
            textTransform: "none",
            fontSize: "1rem",
            px: 3,
            py: 1,
            border: "1px solid rgba(56, 189, 248, 0.1)",
            boxShadow: "0 2px 4px rgba(56, 189, 248, 0.1)",
            "&:hover": {
              background: "linear-gradient(45deg, #0284c7, #2563eb)",
              boxShadow: "0 4px 8px rgba(56, 189, 248, 0.2)",
            },
          }}
        >
          Start Chat
        </Button>
      </Stack>
    </Box>
  );
};

export default Header;
