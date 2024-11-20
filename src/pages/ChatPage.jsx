import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import {Box, TextField, IconButton, Typography, Avatar, Paper, Container, Snackbar, Alert, CircularProgress, Tooltip} from "@mui/material";
import { styled } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useFetchUserData from '../components/useFetchUserData';


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
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const { userData, loading, errorProfileData } = useFetchUserData(profileId, authHeader);

  useEffect(() => {
    fetch(`/api/chat/${profileId}`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const newMessages = data.map((msg, index) => {
          const date = new Date(msg.sendTime);
          const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
          const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        
          return {
            id: `${Date.now()}-${index}`,
            text: JSON.parse(msg.message).text,
            isOwn: msg.targetId == profileId,
            time: formattedTime,
          };
        });
    
        console.log(newMessages);
        setMessages(newMessages);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const handleSendMessage = async () => {
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
  
    try {
      const response = await fetch(`/api/chat/${profileId}`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
  
      // Update the messages state with the new message
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage("");
    } catch (error) {
      setError(error.message);
    }
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
                    src={'data:image/JPG;base64,' + userData.userPreferences.profilePicture}
                    alt="User Avatar"
                    />
                    <Typography variant="h6">{userData.firstName + ' ' + userData.lastName}</Typography>
                </Box>
            </Header>

            <MessageContainer>
            {messages.slice().reverse().map((msg) => (
              <Tooltip  key={msg.id} title={msg.time} arrow>
                <MessageBubble key={msg.id} isOwn={msg.isOwn}>
                  <Typography>{msg.text}</Typography>
                </MessageBubble>
              </Tooltip>
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