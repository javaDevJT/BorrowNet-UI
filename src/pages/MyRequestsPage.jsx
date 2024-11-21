import React, { useEffect, useState } from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Alert, Avatar, Box, Button, Pagination, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MyRequestsPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [requests, setRequests] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('id');

  const authHeader = useAuthHeader();


  useEffect(() => {
    fetch(`/api/posts/requests/borrower/list?pageNo=${pageNo - 1}&sortBy=${sortBy}`, {
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
        setRequests(data.content);
        setTotalPages(data.totalPages);
        console.log(data.content);
      })
      .catch((error) => {
        console.error(error);
        setShowAlert(true);
      });
    }, [pageNo, sortBy]);

    const handlePageChange = (event, value) => {
      setPageNo(value);
    }

    return (
      <React.Fragment>
        {showAlert && (
          <Alert severity="error" variant='filled' sx={{ p: 2 }}>
            Error fetching requests.
          </Alert>
        )}
        {requests.length > 0 ?
          <Stack>
            {requests.map((request, index) => (
            <Paper 
              key={index} 
              sx={{
                borderRadius: 4, 
                my: 1, 
                mx: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                height: '200px',
              }}>
              <Box sx={{my: 2, mx: 3}}>
                <Typography gutterBottom variant="h6" >
                  Item request #{request.id}
                </Typography>
                <Typography variant="body1">
                  Status: {" "}
                  {!request.requestReviewed && (
                    <span style={{ color: 'grey' }}>PENDING</span>
                  )}
                  {request.requestReviewed && request.requestAccepted && (
                    <span style={{ color: 'green' }}>ACCEPTED</span>
                  )}
                  {request.requestReviewed && !request.requestAccepted && (
                    <span style={{ color: 'red' }}>REJECTED</span>
                  )}
                </Typography>
                <Typography variant="body1">
                  Item requested: {request.posting.itemName} - {request.itemRequestLength} day(s)
                </Typography>
                {request.posting.itemDescription !== "" && (
                    <Typography>Description: {request.posting.itemDescription}</Typography>
                )}
                <Typography gutterBottom variant="body1" component={Link} to={`/profile/${request.requester}`} sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Lender: <u>Account #{request.posting.lender}</u>
                </Typography>
              </Box>
              <Avatar 
                variant="square"
                src={'data:image/JPG;base64,' + request.posting.itemPhoto}
                sx={{
                  height: '200px',
                  width: "200px",
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                }} 
              />
            </Paper>
            ))}
            <Pagination
              count={totalPages}
              page={pageNo}
              onChange={handlePageChange}
              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}
            />
          </Stack>
          :
          <Alert severity="info" variant='filled' sx={{ p: 2 }}>
            No requests found at the moment.
          </Alert>
        }
      </React.Fragment>
    );
};

export default MyRequestsPage;