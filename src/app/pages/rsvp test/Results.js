import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import API_URL from '../../constants/apiUrls';
import { useDispatch } from 'react-redux';
import { getRequest } from '../../services';
import { showSnackBar } from '../../../redux/snackBarSlice';
import { CardContent, Grid, Typography, Box, Card } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
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
            message: 'Results retrieved successfully',
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

  const sortedResults = results.sort(
    (a, b) => new Date(b.attempted_on) - new Date(a.attempted_on)
  );
  const firstResult = sortedResults[0];

  function getAccuracyColor(result) {
    const accuracy = calculateAccuracy(result);
    if (accuracy < 50) {
      return 'red';
    } else if (accuracy < 75) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  function calculateAccuracy(result) {
    return Math.round((result.correct_answers / result.total_questions) * 100);
  }

  function getPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const pastelSaturation = Math.floor(Math.random() * 10) + 60; // Range: 60-69
    const pastelLightness = Math.floor(Math.random() * 10) + 80; // Range: 80-89
    return `hsl(${hue}, ${pastelSaturation}%, ${pastelLightness}%)`;
  }

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      {firstResult && (
        <div style={{ padding: '20px', margin: '20px 0' }}>
          <Card
            style={{
              height: '100%',
              borderRadius: '10px',
              backgroundColor: getPastelColor(),
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                style={{ fontWeight: 'bold' }}
              >
                {firstResult.comprehension_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Attempted on:{' '}
                {new Date(firstResult.attempted_on).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Correct Answers: {firstResult.correct_answers}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Total Questions: {firstResult.total_questions}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Comprehension Level: {firstResult.comprehension_level[0]}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">WPM: {firstResult.wpm}</Typography>
                <Tooltip
                  title={`${firstResult.correct_answers}/${firstResult.total_questions}`}
                  style={{ backgroundColor: 'white', color: 'black' }}
                >
                  <Typography
                    variant="body2"
                    style={{
                      color: getAccuracyColor(firstResult),
                      backgroundColor: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Accuracy: {calculateAccuracy(firstResult)}%
                  </Typography>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </div>
      )}
      <Grid container spacing={3}>
        {sortedResults.slice(1).map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result._id}>
            <Card
              style={{
                height: '100%',
                borderRadius: '10px',
                backgroundColor: getPastelColor(),
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ fontWeight: 'bold' }}
                >
                  {result.comprehension_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Attempted on:{' '}
                  {new Date(result.attempted_on).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">WPM: {result.wpm}</Typography>
                  <Tooltip
                    title={`${result.correct_answers}/${result.total_questions}`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: getAccuracyColor(result),
                        backgroundColor: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      Accuracy: {calculateAccuracy(result)}%
                    </Typography>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <SpeedReadGraph results={results} /> */}
    </div>
  );
}

export default Results;
