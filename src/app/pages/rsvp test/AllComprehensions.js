import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Grid } from '@mui/material';
import { Lock } from '@mui/icons-material';
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

  const comprehensions = useSelector((state) => state?.user?.comprehensions);

  const accountLevel = useSelector(
    (state) => state.user.userInfo.account_level
  );

  const navigate = useNavigate();

  const handleClick = (comprehension) => {
    setComprehensionRedux(dispatch, comprehension);
    navigate(URL.READ_COMPREHENSION);
  };
  const sampleJSON = {
    object: {
      1: 'BEGINNER',
      10: 'INTERMEDIATE',
      20: 'EXPERT',
    },
  };
  return (
    <div className="mb-5 pb-5">
      <h4 className="text-center">Choose a comprehension</h4>
      {isLoading ? (
        <div className="d-flex justify-content-between align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid
          container
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          {comprehensions?.map((row, index) => (
            <Grid item xs={12} md={4} key={index} className="m-2 p-2">
              {/* Skill */}
              <div className="d-flex flex-column justify-content-between col-md-12 profile_form_box">
                <label htmlFor="name" className="form-label col-12">
                  <div className="d-flex justify-content-between">
                    <h5>{row.title}</h5>
                  </div>
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>
                      Difficulty:{' '}
                      <span key={index} className="body-2">
                        {row?.level.map((level, ind) => (
                          <div
                            key={ind}
                            style={{
                              color:
                                level === 20
                                  ? 'red'
                                  : level === 10
                                  ? 'orange'
                                  : 'green',
                              marginRight: '3px',
                            }}
                          >
                            {sampleJSON.object[level]}
                          </div>
                        ))}
                      </span>
                    </strong>
                  </span>
                  <span>
                    <strong>
                      Total Words:{' '}
                      <div className="body-2 center-text">{row?.wordCount}</div>
                    </strong>
                  </span>

                  <Button
                    onClick={() => handleClick(row)}
                    startIcon={accountLevel < row?.level[0] && <Lock />}
                    disabled={accountLevel < row?.level[0]}
                    variant="contained"
                  >
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
