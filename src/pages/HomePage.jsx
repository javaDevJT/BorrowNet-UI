import { Avatar, Box, Card, CardContent, Pagination, Stack, Typography, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SearchBarComponent from "../components/SearchBarComponent";

const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [postList, setPostList] = useState([]);
  const [filteredPostList, setFilteredPostList] = useState([]);
  const [pageNo, setPageNo] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Will be updated based on total posts
  const [sortBy, setSortBy] = useState('id'); // Sorting parameter, default to 'id'

  useEffect(() => {
    fetch(`/api/posts/list?pageNo=${pageNo - 1}&sortBy=${sortBy}`, {
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
        setPostList(data.content);
        setFilteredPostList(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error(error);
        setShowAlert(true);
      });
    }, [pageNo, sortBy]);

  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  const authHeader = useAuthHeader();

  return (
    <React.Fragment>
      {showAlert && (
        <Alert severity="error" variant='filled' sx={{ p: 2 }}>
          Error fetching posts.
        </Alert>
      )}
      {postList.length > 0 ?
          <Stack>
            <SearchBarComponent postList={postList} setFilteredPostList={setFilteredPostList}/>
            {filteredPostList.map((post, index) => (
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
                      <Avatar variant='square' src={post.itemPhoto ? 'data:image/JPG;base64,' + post.itemPhoto : 'src/assets/n-a-512.png'} sx={{m: 4, width: 120, height: 120}}/>
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