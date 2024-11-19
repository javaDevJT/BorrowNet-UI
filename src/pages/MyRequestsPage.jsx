import React, { useEffect, useState } from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Alert } from '@mui/material';

const MyRequestsPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [requests, setRequests] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('postingId');

  const authHeader = useAuthHeader();

  useEffect(() => {
    fetch(`/api/posts/requests/list?pageNo=${pageNo - 1}&sortBy=${sortBy}`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response error.');
        }
        return response.json();
      })
      .then((data) => {
        setRequests(data.content);
        setTotalPages(data.totalPages);
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
                      {request}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
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