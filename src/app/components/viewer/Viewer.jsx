import { Link } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import URL from '../../constants/urls.js';
import SpeedReader from './SpeedReader.jsx';
// import SpeedReaderComp from "react-speedread-component";

class SpeedReaderViewer extends React.Component {
  getDefaultState = () => ({
    inputText: this.props.textArea,
    isPlaying: false,
    resetTs: undefined,
    speed: 250,
    chunk: 1,
    setProgress: { timestamp: undefined },
  });

  state = this.getDefaultState();

  // buttonRef = React.createRef(null);

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

    // if (props.chunk > 1)
    return <span>{state.currentText}</span>;

    // const fixedLeft = {
    //   position: "absolute",
    //   display: "inline-block",
    //   transform: "translate(-100%)",
    //   textAlign: "right"
    // };
    // return (
    //   <span>
    //     <span style={fixedLeft}>{state.pre}</span>
    //     <span style={{ color: "red" }}>{state.mid}</span>
    //     <span style={{ position: "absolute" }}>{state.post}</span>
    //   </span>
    // );
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
      transform: `translate(${this.state.chunk === 1 ? 0 : 0}%)`,
      fontSize: '200%',
    };

    const progressBar = this.progressBar(this.state.progress);
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={outerStyle} className="center-text">
          <div style={frameStyle}>
            <div style={speedReaderStyle}>
              <SpeedReader
                renderReader={
                  this.renderReader /*(props, state)=>reactElement*/
                }
                inputText={this.state.inputText}
                speed={this.state.speed || this.getDefaultState().speed}
                isPlaying={this.state.isPlaying}
                setProgress={this.state.setProgress}
                hasEndedCallback={this.pause}
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
          <span
            style={{ cursor: 'col-resize', fontFamily: 'monospace' }}
            onMouseDown={this.setDragTarget}
          >
            {progressBar.bar}
          </span>
          <span
            style={{
              position: 'absolute',
              display: 'inline-block',
              width: '40',
              textAlign: 'right',
            }}
          >
            {progressBar.percent}
          </span>
        </div>

        <div>
          <button className=" m-2" onClick={this.toggleIsPlaying}>
            {this.getProgressPercent(this.state.progress) == 100 ||
            this.getProgressPercent(this.state.progress) == 0
              ? 'Play'
              : 'Pause'}
          </button>
          <div></div>
          <button onClick={this.reset}>Reset</button>
        </div>

        <div>
          <button className=" m-2" onClick={this.decreaseChunk}>
            -
          </button>
          words per flash: {this.state.chunk}
          <button className=" m-2" onClick={this.increaseChunk}>
            +
          </button>
        </div>

        <div className=" m-2">
          <div>
            <input
              style={{ width: 50, textAlign: 'center' }}
              value={this.state.speed || ''}
              placeholder={this.getDefaultState().speed}
              onChange={this.setSpeed}
              className=" m-2"
            />
            WPM
          </div>
          <div>
            {this.props.isComprehension &&
              this.getProgressPercent(this.state.progress) == 100 && (
                <button className=" m-2">
                  <Link
                    to={`${URL.QUESTIONS}`}
                    underline="none"
                    className="color-1D8FF2"
                    as={NavLink}
                  >
                    Proceed to questions
                  </Link>
                </button>
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

        {/* <div
          className="d-flex flex column 
        align-items-center"
        >
          <SpeedReaderComp
            ref={this.buttonRef}
            article={this.state.inputText}
            unreadStyle={{ color: "green" }}
            activeStyle={{ color: "orange" }}
            readStyle={{ color: "green" }}
            wpm={this.state.speed}
          />
        </div> */}

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
