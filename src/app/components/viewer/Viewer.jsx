import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import URL from '../../constants/urls.js';
import SpeedReader from './SpeedReader.jsx';

class SpeedReaderViewer extends React.Component {
  getDefaultState = () => ({
    inputText: this.props.textArea,
    isPlaying: false,
    resetTs: undefined,
    speed: this.props.wpm,
    chunk: 1,
    setProgress: { timestamp: undefined },
  });

  state = this.getDefaultState();

  childRef = React.createRef();

  toggleIsPlaying = (e) => {
    document.activeElement.blur();
    const isPlaying = this.state.isPlaying;
    this.setState({ isPlaying: !isPlaying });
    // this.buttonRef.current.click();
  };

  reset = (opts) => {
    if (!(opts || {}).skipBlur) document.activeElement.blur();
    this.setState({
      isPlaying: false,
      resetTs: new Date().getTime(),
    });
  };

  increaseChunk = () => {
    this.alterChunk(1);
  };

  decreaseChunk = () => {
    this.alterChunk(-1);
  };

  setInputText = (e) => {
    this.setState({ inputText: e.target.value }, () => {
      this.reset({ skipBlur: true });
    });
  };

  setSpeed = (e) => {
    const v = e.target ? e.target.value : e;
    if (isNaN(v) || v < 0) return;
    this.setState({ speed: parseInt(v || 0) });
    this.props.setWpm(parseInt(v || 0));
  };

  alterChunk = (x) => {
    document.activeElement.blur();
    const chunk = this.clamp(this.state.chunk + x, 1, 3);
    this.setState({ chunk }, this.reset);
  };

  clamp = (x, min, max) => {
    if (x < min) return min;
    if (x > max) return max;
    return x;
  };

  progress = (x) => {
    this.setState({ progress: x });
  };

  dragTarget = undefined;

  setProgressPercent = (e) => {
    if (this.dragTarget) {
      window.getSelection().removeAllRanges();
      const rect = this.dragTarget.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) * 100) / rect.width;
      const setProgress = {
        percent,
        timestamp: new Date().getTime(),
      };
      this.setState({ setProgress });
    }
  };

  setProgressSkipFor = (x) => {
    const setProgress = {
      skipFor: x,
      timestamp: new Date().getTime(),
    };
    this.setState({ setProgress });
  };

  progressBar = (progress) => {
    const chunks = 25;
    const ratio = progress ? progress.at / progress.of : 0;
    const integerPart = Math.floor(ratio * chunks);
    let progressBar = new Array(integerPart + 1).join('#');
    progressBar += new Array(chunks - integerPart + 1).join('_');
    return {
      bar: `[${progressBar}]`,
      percent: `${(ratio * 100).toFixed(0)}%`,
    };
  };

  getProgressPercent = (progress) => {
    const ratio = progress ? progress.at / progress.of : 0;
    const donePercent = (ratio * 100).toFixed(0);
    return donePercent;
  };

  componentDidMount = () => {
    document.addEventListener('mousemove', this.setProgressPercent);
    document.addEventListener('click', this.removeDragTarget);
    document.addEventListener('keydown', this.handleShortcuts);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousemove', this.setProgressPercent);
    document.removeEventListener('click', this.removeDragTarget);
    document.removeEventListener('keydown', this.handleShortcuts);
  };

  handleShortcuts = (e) => {
    if (document.activeElement.tagName !== 'BODY') return;

    const skipFor = 3;
    const chgSpeed = 10;

    if (e.keyCode === 32)
      //space
      this.setState({ isPlaying: !this.state.isPlaying });

    if (e.keyCode === 37) {
      //left
      if (e.ctrlKey) this.reset();
      else this.setProgressSkipFor(-skipFor);
    }
    if (e.keyCode === 39)
      //right
      this.setProgressSkipFor(skipFor);

    if (e.keyCode === 38)
      //up
      this.setSpeed(this.state.speed + chgSpeed);

    if (e.keyCode === 40)
      //down
      this.setSpeed(this.state.speed - chgSpeed);

    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32) {
      e.preventDefault();
    }
  };

  removeDragTarget = () => {
    this.dragTarget = undefined;
  };

  setDragTarget = (e) => {
    this.dragTarget = e.target;
    this.setProgressPercent(e);
  };

  renderReader = (props, state) => {
    if (!state.currentText) return <span>&nbsp;</span>;

    if (props.chunk > 1) return <span>{state.currentText}</span>;

    const fixedLeft = {
      position: 'absolute',
      display: 'inline-block',
      transform: 'translate(-100%)',
      textAlign: 'center',
    };
    return (
      <span>
        <span style={fixedLeft}>{state.pre}</span>
        <span style={{ color: 'red' }}>{state.mid}</span>
        <span style={{ position: 'absolute' }}>{state.post}</span>
      </span>
    );
  };

  render = () => {
    const outerStyle = {
      display: 'inline-block',
      height: 300,
      width: 600,
      border: '1px solid black',
      margin: '10px',
    };

    const frameStyle = {
      border: 'transparent',
      borderWidth: 1,
      borderLeftStyle: 'none',
      borderRightStyle: 'none',
      position: 'relative',
      top: '46%',
      transform: 'translateY(-51%)', // -1% for snap to pixel..
      backgroundColor: '#FFF',
    };

    const speedReaderStyle = {
      transform: `translate(${this.state.chunk === 1 ? -2 : 0}%)`,
      fontSize: '200%',
    };

    const progressBar = this.progressBar(this.state.progress);
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={outerStyle} className="center-text">
          <div style={frameStyle}>
            <div style={speedReaderStyle}>
              <SpeedReader
                renderReader={this.renderReader}
                inputText={this.state.inputText}
                speed={this.state.speed || this.getDefaultState().speed}
                isPlaying={this.state.isPlaying}
                setProgress={this.state.setProgress}
                hasEndedCallback={() => this.props.setReadOnce(true)}
                progressCallback={this.progress}
                chunk={this.state.chunk}
                reset={this.state.resetTs}
                trim={{ regex: /\.|,|\?|!/ }}
                offset={{ regex: /\.|,|\?|!/, duration: 0.5 }}
                blank={{ regex: /\.|\?|!/, duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(progressBar.percent, 10)}
            onChange={this.setDragTarget}
          />
          &nbsp;
          <span>{progressBar.percent}</span>
        </div>

        <div>
          <Button
            className=" m-2"
            variant="contained"
            onClick={this.toggleIsPlaying}
          >
            {!this.state.isPlaying ||
            this.getProgressPercent(this.state.progress) == 100
              ? 'Play'
              : 'Pause'}
          </Button>
          <div></div>
          <Button onClick={this.reset} variant="contained" color="secondary">
            Reset
          </Button>
        </div>

        <div>
          <Button
            className=" m-2"
            variant="contained"
            color="error"
            onClick={this.decreaseChunk}
          >
            -
          </Button>
          words per flash: {this.state.chunk}
          <Button
            className=" m-2"
            variant="contained"
            color="success"
            onClick={this.increaseChunk}
          >
            +
          </Button>
        </div>

        <div className=" m-2">
          <div>
            <input
              style={{ width: 50, textAlign: 'center' }}
              value={this.state.speed || ''}
              placeholder={this.getDefaultState().speed}
              onChange={this.setSpeed}
              className=" m-2"
              id="getWPM"
            />
            WPM
          </div>
          <div>
            {this.props.isComprehension && this.props.readOnce && (
              <Button
                variant="contained"
                color="warning"
                className=" m-2"
                onClick={() => {
                  this.childRef.current.click();
                }}
              >
                <Typography
                  component={RouterLink}
                  to={`${URL.QUESTIONS}`}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'none',
                    },
                  }}
                  ref={this.childRef}
                >
                  Proceed to questions
                </Typography>
              </Button>
            )}
          </div>
        </div>

        <textarea
          // hidden={this.props.textArea !== null}
          hidden
          rows={7}
          cols={35}
          type="text"
          value={this.state.inputText}
          onChange={this.setInputText}
        />

        <div style={{ margin: 5, color: 'grey' }}>
          <div>
            [<strong>Space</strong>] : play / pause [
            <strong>Ctrl + Left</strong>] : reset
          </div>
          <div>
            [<strong>Left / Right</strong>] : skip backward / forward 3 words
          </div>
          <div>
            [<strong>Up / Down</strong>] : increase / decrease speed for 10 WPM
          </div>
        </div>
      </div>
    );
  };
}

export default SpeedReaderViewer;
