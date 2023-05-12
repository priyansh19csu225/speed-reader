import { Button, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getComprehensions,
  setComprehensionRedux,
} from '../../../redux/apiCalls';
import { EMPTY_ARRAY } from '../../constants';
import URL from '../../constants/urls';

function AllComprehensions() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getComprehensions(dispatch).finally(setIsLoading(false));
  }, EMPTY_ARRAY);

  const comprehensions = useSelector(
    (state) => state.user.userInfo.comprehensions
  );

  const navigate = useNavigate();

  const handleClick = (comprehension) => {
    setComprehensionRedux(dispatch, comprehension);
    navigate(URL.COMPREHENSION);
  };
  const sampleJSON = {
    object: {
      1: 'BEGINNER',
      10: 'INTERMEDIATE',
      20: 'EXPERT',
    },
  };
  return (
    <div>
      <h4 className="text-center">Choose a comprehension</h4>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {comprehensions.map((row, index) => (
            <Grid item xs={12} md={5} key={index} className="m-2 p-2">
              {/* Skill */}
              <div className="col-md-12 profile_form_box">
                <label htmlFor="name" className="form-label col-12">
                  <div className="d-flex justify-content-between">
                    <h5>{row.title}</h5>

                    <h6 className="body-2">{sampleJSON.object[row.level]}</h6>
                  </div>
                </label>
                <div className="d-flex justify-content-end">
                  <Button onClick={() => handleClick(row)} variant="contained">
                    Start
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default AllComprehensions;
