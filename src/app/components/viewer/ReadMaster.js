import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';
import GetData from '../../pages/rsvp test/GetData';
import SpeedReaderViewer from './Viewer';
import StaticSpeedReader from './StaticSpeedReader';
import { setStaticReader, setWordsPerMinute } from '../../../redux/userSlice';

function ReadMaster(props) {
  const { customUserText, randomComprehension } = props;
  const location = useLocation();
  const textArea = location.state?.text || '';
  const emptyEditor = location.state?.emptyEditor;
  const isStaticreader = useSelector((state) => state.user?.isStaticReader);
  const dispatch = useDispatch();
  const defaultText = `You have a long list of things you know you should be doing regularly... But for some reason, you just don’t do them. What’s the deal? The solution is building habits. Doing hard things isn’t hard if you’re on autopilot. But how do we make building habits simple and painless?`;
  const [tabValue, setTabValue] = useState(isStaticreader ? 1 : 0);
  const [readOnce, setReadOnce] = useState(false);
  const handleStaticReader = (event, newValue) => {
    dispatch(setStaticReader());
    setTabValue(newValue);
  };
  const [wpm, setWpm] = useState(250);
  useEffect(() => {
    if (readOnce) dispatch(setWordsPerMinute(wpm));
  }, [readOnce]);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Tabs value={tabValue} onChange={handleStaticReader}>
          <Tab label="RSVP Tool" id="tab-0" />
          <Tab label="Static Tool" id="tab-1" />
        </Tabs>
      </div>
      <div className="container d-flex subHeader justify-content-center mb-5 pb-5">
        {textArea ? (
          isStaticreader ? (
            <StaticSpeedReader
              textArea={textArea.trim() === '' ? defaultText : textArea}
              isComprehension={!emptyEditor}
              readOnce={readOnce}
              setReadOnce={setReadOnce}
              wpm={wpm}
              setWpm={setWpm}
            />
          ) : (
            <SpeedReaderViewer
              textArea={textArea.trim() === '' ? defaultText : textArea}
              isComprehension={!emptyEditor}
              readOnce={readOnce}
              setReadOnce={setReadOnce}
              wpm={wpm}
              setWpm={setWpm}
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
