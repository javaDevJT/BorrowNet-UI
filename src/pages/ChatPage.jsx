import { useParams } from 'react-router-dom'
import React, { useState } from "react";
import {Box, TextField, IconButton, Typography, Avatar, Paper, Container, Snackbar, Alert} from "@mui/material";
import { styled } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';


const ChatContainer = styled(Paper)(() => ({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
}));

const Header = styled(Box)(({ theme }) => ({
  padding: "16px",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const MessageContainer = styled(Box)({
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
});

const MessageBubble = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwn'
})(({ isOwn }) => ({
    maxWidth: "70%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: isOwn ? "#2196f3" : "#f5f5f5",
    color: isOwn ? "white" : "black",
    alignSelf: isOwn ? "flex-end" : "flex-start",
    wordWrap: "break-word", // Allows long words to break to the next line
    whiteSpace: "pre-wrap", // Preserves whitespace and line breaks
    transition: "transform 0.2s",
}));

const InputContainer = styled(Box)({
  padding: "16px",
  display: "flex",
  gap: "8px",
  borderTop: "1px solid #e0e0e0"
});

const ChatPage = () => {
  const { profileId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", isOwn: false },
    { id: 2, text: "Hi! How are you?", isOwn: true },
    { id: 3, text: "I'm doing great, thanks for asking!", isOwn: false }
  ]);
  const [error, setError] = useState(null);

  const handleSendMessage = () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    if (message.length > 500) {
      setError("Message is too long");
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
        <ChatContainer>
            <Header>
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                    src="images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt="User Avatar"
                    />
                    <Typography variant="h6">Sarah Johnson</Typography>
                </Box>
            </Header>

            <MessageContainer>
            {messages.map((msg) => (
                <MessageBubble key={msg.id} isOwn={msg.isOwn}>
                <Typography>{msg.text}</Typography>
                </MessageBubble>
            ))}
            </MessageContainer>

            <InputContainer>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    maxRows={4}
                    aria-label="Message input"
                />
                <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    aria-label="Send message"
                    sx={{
                        width: 48, // Fixed width
                        height: 48, // Fixed height
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "primary.dark"
                        }
                    }}
                >
                    <SendIcon/>
                </IconButton>
            </InputContainer>
        </ChatContainer>

    <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
    >
        <Alert severity="error" onClose={() => setError(null)}>
        {error}
        </Alert>
    </Snackbar>
    </Container>
  );
};

export default ChatPage;