import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import API_URL from '../../constants/apiUrls';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '../../services';
import { showSnackBar } from '../../../redux/snackBarSlice';
import { CardContent, Grid, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Box } from '@mui/system';
import SpeedReadGraph from './SpeedReadGraph';

function Results() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  useEffect(() => {
    getRequest(`${API_URL.GET_USER_RESULT}?email=${user.email}`)
      .then((res) => {
        console.log(res);
        setResults(res?.data?.results);
        dispatch(
          showSnackBar({
            setopen: true,
            message: 'Results retreived successfully',
            severity: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: error?.data.msg,
            severity: 'error',
          })
        );
      });
  }, []);

  return (
    <div className="container">
      <Grid container spacing={3}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {result.comprehension_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Attempted on: {new Date(result.attempted_on).toLocaleString()}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">WPM: {result.wpm}</Typography>
                  <Typography variant="body2">
                    Correct Answers: {result.correct_answers}/
                    {result.total_questions}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SpeedReadGraph results={results} />
    </div>
  );
}

export default Results;
