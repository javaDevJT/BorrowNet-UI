import { Avatar, Box, Card, CardContent, Pagination, Stack, Typography, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [postList, setPostList] = useState([]); // Initialize an empty array to store posts

  const [pageNo, setPageNo] = useState(1); // To manage current page number
  const [totalPages, setTotalPages] = useState(1); // To manage total pages
  const [sortBy, setSortBy] = useState('id'); // Backend defaults to sorting by 'id'
  const pageSize = 10; // Assuming 10 posts per page

  const fetchPosts = async (pageNo, pageSize, sortBy) => {
    try {
      const response = await fetch(`/api/posts/list?pageNo=${pageNo - 1}&pageSize=${pageSize}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error('Network response error.');
      } else {
        const data = await response.json();
        setPostList(data); // Assuming the API returns an array of posts directly
        // setTotalPages(data.totalPages || Math.ceil(totalPosts / pageSize));
      }
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    fetchPosts(pageNo, pageSize, sortBy);
  }, [pageNo, pageSize, sortBy]);

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
      <Stack>
        {postList.map((post, index) => (
          <Card key={index} sx={{ borderRadius: 4, my: 1, mx: 5 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", maxWidth: '100%', maxHeight: 150, minHeight: 150 }}>
                <Box sx={{ my: 2, mx: 3 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', my: 2 }}>
                    {post.description}
                  </Typography>
                </Box>
                <Avatar variant='square' src={post.picture} sx={{ m: 4, width: 120, height: 120 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
        <Pagination 
          count={totalPages} // Adjust if backend returns total pages
          page={pageNo} 
          onChange={handlePageChange} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }} 
        />
      </Stack>
    </React.Fragment>
  );
}

export default HomePage;