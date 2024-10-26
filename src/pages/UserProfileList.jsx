import {Avatar, Box, Card, CardContent, Pagination, Stack, Typography, Alert, Rating} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SearchBarComponent from "../components/SearchBarComponent";
import {Link} from "react-router-dom";

const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [userList, setUserList] = useState([]);
  const [pageNo, setPageNo] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Will be updated based on total posts
  const [sortBy, setSortBy] = useState('id'); // Sorting parameter, default to 'id'

  const authHeader = useAuthHeader();

  useEffect(() => {
    fetch(`/api/user/public/list?pageNo=${pageNo - 1}&sortBy=${sortBy}`, {
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
  return (
    <React.Fragment>
      {showAlert && (
        <Alert severity="error" variant='filled' sx={{ p: 2 }}>
          Error fetching users.
        </Alert>
      )}
      {userList.length > 0 ?
          <Stack>
            <SearchBarComponent placeholder={"Search Users"} />
            {userList.map((user, index) => (
                <Link key={index} to={'/profile/' + user.id}>
                <Card hoverable sx={{borderRadius: 4, my: 1, mx: 5}}>
                  <CardContent >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: "space-between",
                      maxWidth: '100%',
                      maxHeight: 150,
                      minHeight: 150
                    }}>
                      <Box sx={{my: 2, mx: 3}} >
                        <Typography gutterBottom variant="h5" component="div">
                          {user.firstName}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary', my: 2}}>
                          {'Average Rating: ' + getAverageRating(user.ratingsReceived)}
                          <Rating size={'small'} value={getAverageRating(user.ratingsReceived)} readOnly={true}>
                          </Rating>
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary', my: 2}}>
                          {'Items Posted: ' + user.postings.length}
                        </Typography>
                      </Box>
                      <Avatar variant='square' src={user.userPreferences.profilePicture ? 'data:image/JPG;base64,' + user.userPreferences.profilePicture : 'src/assets/n-a-512.png'} sx={{m: 4, width: 120, height: 120}}/>
                    </Box>
                  </CardContent>
                </Card>
                </Link>
            ))}
            <Pagination
                count={totalPages} // Total number of pages based on posts
                page={pageNo}
                onChange={handlePageChange}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}
            />
          </Stack> : <div>No Users</div>}
    </React.Fragment>
  );
}

function getAverageRating(ratings) {
  let total = 0;
  let count = 0;
  ratings.forEach(rating => {
    total += rating.rating;
    count += 1;
  });
  if (count == 0) {
    return 'User not yet rated. ';
  }
  return (total / count) + ' ';
}

export default HomePage;