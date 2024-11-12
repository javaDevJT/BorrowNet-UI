import { Card, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyChatsPage = () => {
    let chatList = [1, 2, 3];
    const navigate = useNavigate();

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