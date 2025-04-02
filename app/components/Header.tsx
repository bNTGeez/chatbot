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
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            px: 2,
            py: 1,
            "&:hover": {
              background: "rgba(56, 189, 248, 0.1)",
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
            background:
              "linear-gradient(45deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))",
            backdropFilter: "blur(10px)",
            textTransform: "none",
            fontSize: "1rem",
            px: 3,
            py: 1,
            border: "1px solid rgba(56, 189, 248, 0.1)",
            "&:hover": {
              background:
                "linear-gradient(45deg, rgba(56, 189, 248, 0.3), rgba(129, 140, 248, 0.3))",
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
