import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for fetching data from an API endpoint
function useDataFetch(apiEndpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiEndpoint);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
}

export default useDataFetch;