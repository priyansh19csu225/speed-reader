import React from 'react';
import { useLocation } from 'react-router-dom';
import GetData from '../../pages/rsvp test/GetData';
import SpeedReaderViewer from './Viewer';

function ReadMaster() {
  const location = useLocation();
  const textArea = location.state?.text || '';
  const emptyEditor = location.state?.emptyEditor;
  const defaultText = `You have a long list of things you know you should be doing regularly... But for some reason, you just don’t do them. What’s the deal? The solution is building habits. Doing hard things isn’t hard if you’re on autopilot. But how do we make building habits simple and painless?`;
  return (
    <div className="container d-flex subHeader justify-content-center">
      {textArea ? (
        <SpeedReaderViewer
          textArea={textArea.trim() === '' ? defaultText : textArea}
          isComprehension={!emptyEditor}
        />
      ) : (
        <GetData emptyEditor />
      )}
    </div>
  );
}

export default ReadMaster;
