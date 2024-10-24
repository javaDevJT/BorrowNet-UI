import { Avatar, Box, Card, CardContent, Pagination, Stack, Typography, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [postList, setPostList] = useState([]);
  const [pageNo, setPageNo] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Will be updated based on total posts
  const [sortBy, setSortBy] = useState('id'); // Sorting parameter, default to 'id'

  const authHeader = useAuthHeader();

  useEffect(() => {
    fetch(`/api/posts/list?page=${pageNo - 1}&order=${sortBy}`, {
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
        setPostList(data);
        const totalPosts = data.length;
        setTotalPages(Math.ceil(totalPosts / 10));
      })
      .catch((error) => {
        console.error(error);
        setShowAlert(true);
      });
    }, [pageNo, sortBy]);

  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  return (
    <React.Fragment>
      {showAlert && (
        <Alert severity="error" variant='filled' sx={{ p: 2 }}>
          Error fetching posts.
        </Alert>
      )}
      {postList.length > 0 ?
          <Stack>
            {postList.map((post, index) => (
                <Card key={index} sx={{borderRadius: 4, my: 1, mx: 5}}>
                  <CardContent>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: "space-between",
                      maxWidth: '100%',
                      maxHeight: 150,
                      minHeight: 150
                    }}>
                      <Box sx={{my: 2, mx: 3}}>
                        <Typography gutterBottom variant="h5" component="div">
                          {post.itemName}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary', my: 2}}>
                          {post.itemDescription}
                        </Typography>
                      </Box>
                      <Avatar variant='square' src={post.itemPhoto} sx={{m: 4, width: 120, height: 120}}/>
                    </Box>
                  </CardContent>
                </Card>
            ))}
            <Pagination
                count={totalPages} // Total number of pages based on posts
                page={pageNo}
                onChange={handlePageChange}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}
            />
          </Stack> : <div>No Posts</div>}
    </React.Fragment>
  );
}

export default HomePage;