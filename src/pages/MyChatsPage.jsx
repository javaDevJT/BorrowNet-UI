import { Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

const MyChatsPage = () => {
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    const authUser = useAuthUser()    

    const [showAlert, setShowAlert] = useState(false);
    const [chatList, setChatList] = useState([]);

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
        const myId = getCookie('myId');
        console.log(data);
        const chats = data.map((chat) => {
          const isMyIdSender = chat.senderId == myId; // Check if myId matches senderId
          return {
            target: isMyIdSender ? chat.targetUsername : chat.senderUsername,
            targetId: isMyIdSender ? chat.targetUserId : chat.senderId,
            text: JSON.parse(chat.messagePreview).text,
            //time: msg.sendTime          
          };
        });
        
        setChatList(chats);
        console.log(chats);
        console.log(authUser);
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
                onClick={() => navigate(`/chat/${elem.targetId}`)}

            >
                <Typography variant='h5'>{elem.target}</Typography>
                <Typography variant='body1' sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>{elem.text}</Typography>
            </Paper>
        ))}

        </Stack>
  )
}

export default MyChatsPage