import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';

function Error() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="m-auto text-center">
      {isLoading ? (
        <h1>
          <CircularProgress size="10rem" />
        </h1>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
}

export default Error;
