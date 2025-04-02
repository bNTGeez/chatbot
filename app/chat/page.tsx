"use client";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header";
import { SendHorizontal } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I am your JavaScript Assistant. How can I help you today?`,
    },
  ]);

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessage("");
    const userMessage = { role: "user", content: message };
    setMessages((messages) => [...messages, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([userMessage]),
      });

      if (response.ok) {
        const data = await response.text();
        simulateTyping(data);
      } else {
        console.error("Failed to fetch the chat response");
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  const simulateTyping = (text: string) => {
    const speed = 10;
    let index = 0;
    let currentText = "";
    const length = text.length;

    const typeNextChar = () => {
      if (index < length) {
        currentText += text.charAt(index);
        index++;
        setMessages((messages) => [
          ...messages.slice(0, -1),
          { role: "assistant", content: currentText },
        ]);
        if (index < length) {
          setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
        }
      }
    };

    setMessages((messages) => [
      ...messages,
      { role: "assistant", content: "" },
    ]);
    typeNextChar();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          pt: 8,
          pb: 4,
          px: 2,
        }}
      >
        <Stack
          direction="column"
          sx={{
            width: "100%",
            maxWidth: "800px",
            height: "80vh",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            p: 3,
            border: "1px solid rgba(255, 255, 255, 0.05)",
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
              pointerEvents: "none",
            },
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              mb: 2,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                },
              },
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.role === "assistant" ? "flex-start" : "flex-end",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "80%",
                    background:
                      message.role === "assistant"
                        ? "rgba(56, 189, 248, 0.1)"
                        : "rgba(129, 140, 248, 0.1)",
                    borderRadius: 3,
                    p: 2,
                    border: "1px solid",
                    borderColor:
                      message.role === "assistant"
                        ? "rgba(56, 189, 248, 0.2)"
                        : "rgba(129, 140, 248, 0.2)",
                  }}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.9)",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      code: ({ children }) => (
                        <Box
                          component="code"
                          sx={{
                            background: "rgba(0, 0, 0, 0.2)",
                            p: 0.5,
                            borderRadius: 1,
                            fontFamily: "monospace",
                            color: "#38bdf8",
                          }}
                        >
                          {children}
                        </Box>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </Box>
              </Box>
            ))}
            {isTyping && (
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                AI is typing...
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1} sx={{ position: "relative" }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about JavaScript..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(56, 189, 248, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(56, 189, 248, 0.5)",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={!message.trim() || isTyping}
              sx={{
                minWidth: "fit-content",
                px: 3,
                background:
                  "linear-gradient(45deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(56, 189, 248, 0.1)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, rgba(56, 189, 248, 0.3), rgba(129, 140, 248, 0.3))",
                },
                "&.Mui-disabled": {
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <SendHorizontal size={20} strokeWidth={1.5} />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
