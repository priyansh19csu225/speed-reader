import React, { useState } from 'react';
import { EMPTY_ARRAY } from '../../constants';

function ErrorFallback() {
  const [time, setTime] = useState(10);

  useState(() => {
 
      setInterval(() => {
        setTime((seconds) => seconds - 1);
      }, 1000);
      setTimeout(() => {
        window.location.replace('./');
      }, 10000);
    
  }, EMPTY_ARRAY);
  return (
    <div className="container mt-5" role="alert">
      <div>
        <p>Something went wrong:</p>
      </div>
      <div>
        <pre>Redirecting to homepage in {`${time}`} seconds</pre>
      </div>
      <div>
        <a href="./" style={{ textDecoration: 'none' }}>
          Speed Reader
        </a>
      </div>
    </div>
  );
}

export default ErrorFallback;
