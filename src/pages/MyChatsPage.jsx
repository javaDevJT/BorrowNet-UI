import { Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';

const MyChatsPage = () => {
    let chatList = [1, 2, 3];
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    
    const [showAlert, setShowAlert] = useState(false);
    const [chatListTest, setUserList] = useState([]);

    useEffect(() => {
    fetch(`/api/chat`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response error.');
        }
        return response.json();
      })
      .then((data) => {
        setUserList(data.content);
      })
      .catch((error) => {
        console.error(error);
        setShowAlert(true);
      });
    }, []);

    return (
        <Stack>
            {chatList.map((elem, index) => (
            <Paper key={index} elevation={6}
                sx={{
                    mx:3,
                    my:1,
                    px:4,
                    py:2,
                    cursor: 'pointer',
                }}
                onClick={() => navigate(`/chat/${elem}`)}

            >
                <Typography variant='h5'>John Doe</Typography>
                <Typography variant='body1' sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>Come stai?</Typography>
            </Paper>
        ))}

        </Stack>
  )
}

export default MyChatsPage