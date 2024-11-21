import React, { useEffect, useState } from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Alert, Box, Button, Pagination, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MyRequestsPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [requests, setRequests] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('id');

  const authHeader = useAuthHeader();


  useEffect(() => {
    fetch(`/api/posts/requests/lender/list?pageNo=${pageNo - 1}&sortBy=${sortBy}`, {
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

    const handleAccept = (requestId) => {
      fetch(`/api/posts/requests/review/${requestId}/accept`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json', 
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to accept request');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Request accepted successfully:', data);
          window.location.reload()
        })
        .catch((error) => {
          console.error('There was a problem while accepting the request:', error);
        });
    }

    const handleReject = (requestId) => {
      fetch(`/api/posts/requests/review/${requestId}/reject`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json', 
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to reject request');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Reject accepted successfully:', data);
          window.location.reload()
        })
        .catch((error) => {
          console.error('There was a problem while rejecting the request:', error);
        });
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
              }}>
              <Box sx={{my: 2, mx: 3}}>
                <Typography gutterBottom variant="h6" >
                  Item request #{request.id} {" "}
                  {request.requestReviewed && request.requestAccepted && (
                    <span style={{ color: 'green' }}>(Accepted)</span>
                  )}
                  {request.requestReviewed && !request.requestAccepted && (
                    <span style={{ color: 'red' }}>(Rejected)</span>
                  )}
                </Typography>
                <Typography>
                  Item requested: {request.posting.itemName} - {request.itemRequestLength} day(s)
                </Typography>
                <Typography gutterBottom variant="body1" component={Link} to={`/profile/${request.requester}`} sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Requester: <u>Account #{request.requester}</u>
                </Typography>
              </Box>
              <Box 
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: "space-between",
                  my:1,
                  mx:3,
                }}>
                
                {request.requestReviewed ? (
                  <>
                    <Button disabled variant='contained' color='success' sx={{ m: 1 }}>
                      Accept
                    </Button>
                    <Button disabled variant='contained' color='error' sx={{ m: 1 }}>
                      Reject
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant='contained' color='success' sx={{ m: 1 }} onClick={() => handleAccept(request.id)}>
                      Accept
                    </Button>
                    <Button variant='contained' color='error' sx={{ m: 1 }} onClick={() => handleReject(request.id)}>
                      Reject
                    </Button>
                  </>
                )}
              </Box>
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