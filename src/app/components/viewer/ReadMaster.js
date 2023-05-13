import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';
import GetData from '../../pages/rsvp test/GetData';
import SpeedReaderViewer from './Viewer';
import StaticSpeedReader from './StaticSpeedReader';
import { setStaticReader } from '../../../redux/userSlice';

function ReadMaster(props) {
  const { customUserText, randomComprehension } = props;
  const location = useLocation();
  const textArea = location.state?.text || '';
  const emptyEditor = location.state?.emptyEditor;
  const isStaticreader = useSelector((state) => state.user?.isStaticReader);
  const dispatch = useDispatch();
  const defaultText = `You have a long list of things you know you should be doing regularly... But for some reason, you just don’t do them. What’s the deal? The solution is building habits. Doing hard things isn’t hard if you’re on autopilot. But how do we make building habits simple and painless?`;
  const [tabValue, setTabValue] = useState(isStaticreader ? 1 : 0);

  const handleStaticReader = (event, newValue) => {
    dispatch(setStaticReader());
    setTabValue(newValue);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Tabs value={tabValue} onChange={handleStaticReader}>
          <Tab label="RSVP Tool" id="tab-0" />
          <Tab label="Static Tool" id="tab-1" />
        </Tabs>
      </div>
      <div className="container d-flex subHeader justify-content-center">
        {textArea ? (
          isStaticreader ? (
            <StaticSpeedReader
              textArea={textArea.trim() === '' ? defaultText : textArea}
              isComprehension={!emptyEditor}
            />
          ) : (
            <SpeedReaderViewer
              textArea={textArea.trim() === '' ? defaultText : textArea}
              isComprehension={!emptyEditor}
            />
          )
        ) : (
          <GetData
            emptyEditor={customUserText}
            randomComprehension={randomComprehension}
          />
        )}
      </div>
    </>
  );
}

ReadMaster.defaultProps = {
  customUserText: false,
  randomComprehension: false,
};

ReadMaster.propTypes = {
  customUserText: PropTypes.bool,
  randomComprehension: PropTypes.bool,
};

export default ReadMaster;
