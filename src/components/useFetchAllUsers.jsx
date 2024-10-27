import { useState, useEffect } from 'react';

const useFetchAllUsers = (authHeader) => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/public/list?pageNo=${0}&sortBy=${'id'}`, {
          method: 'GET',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAllUsers(data.content);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authHeader]);

  return { allUsers, loading, error };
};

export default useFetchAllUsers;