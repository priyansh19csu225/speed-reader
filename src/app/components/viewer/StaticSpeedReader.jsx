import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import URL from '../../constants/urls.js';
import SpeedReader2 from './SpeedReader2.js';

class StaticSpeedReader extends React.Component {
  getDefaultState = () => ({
    inputText: this.props.textArea,
    isPlaying: false,
    resetTs: undefined,
    speed: this.props.wpm,
    chunk: 1,
    setProgress: { timestamp: undefined },
    percentageRead: 0,
  });

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.handlePercentageRead = this.handlePercentageRead.bind(this);
  }

  handlePercentageRead(percentage) {
    if (percentage == 100) {
      this.props.setReadOnce(true);
    }
    this.setState({ percentageRead: percentage });
  }

  childRef = React.createRef();
  buttonRef = React.createRef();

  toggleIsPlaying = (e) => {
    document.activeElement.blur();
    const isPlaying = this.state.isPlaying;
    isPlaying ? this.buttonRef.current.pause() : this.buttonRef.current.start();
    this.setState({ isPlaying: !isPlaying });
    console.log(this.buttonRef);
  };

  reset = (opts) => {
    if (!(opts || {}).skipBlur) document.activeElement.blur();
    this.setState({
      isPlaying: false,
      resetTs: new Date().getTime(),
    });
    this.buttonRef.current.setState({ activeWord: -1 });
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
      this.toggleIsPlaying(e);

    if (e.keyCode === 37) {
      //left

      if (e.ctrlKey) this.reset();
      else {
        this.setProgressSkipFor(-skipFor);
        this.buttonRef.current.setState((prevState) => ({
          activeWord:
            prevState.activeWord - skipFor > -1
              ? prevState.activeWord - skipFor
              : -1,
        }));
      }
    }
    if (e.keyCode === 39) {
      //right
      this.setProgressSkipFor(skipFor);
      this.buttonRef.current.setState((prevState) => ({
        activeWord: prevState.activeWord + skipFor,
      }));
    }
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
      height: 'auto',
      width: 900,
      border: '1px solid black',
      margin: '10px',
      padding: '10px',
    };

    const frameStyle = {
      border: 'transparent',
      borderWidth: 1,
      // borderLeftStyle: 'none',
      // borderRightStyle: 'none',
      // position: 'relative',
      // top: '46%',
      // transform: 'translateY(-51%)', // -1% for snap to pixel..
      backgroundColor: '#FFF',
    };

    const speedReaderStyle = {
      transform: `translate(${this.state.chunk === 1 ? 0 : 0}%)`,
      fontSize: '120%',
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={outerStyle} className="center-text">
          <div style={frameStyle}>
            <div style={speedReaderStyle}>
              <div
                className="d-flex flex-column 
align-items-center flex-wrap"
              >
                <SpeedReader2
                  ref={this.buttonRef}
                  article={this.state.inputText}
                  unreadStyle={{ color: 'yellow' }}
                  activeStyle={{ color: 'red' }}
                  readStyle={{ color: 'aqua' }}
                  wpm={this.state.speed}
                  style={{ pointerEvents: 'none' }}
                  onPercentageRead={this.handlePercentageRead}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div>
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
            {this.state.percentageRead || 0}
          </span>
        </div> */}
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={this.state.percentageRead}
          />
          &nbsp;
          <span>
            {this.state.percentageRead}
            {`%`}
          </span>
        </div>

        <div>
          <Button
            className=" m-2"
            variant="contained"
            onClick={this.toggleIsPlaying}
          >
            {!this.state.isPlaying || this.state.percentageRead == 100
              ? 'Play'
              : 'Pause'}
          </Button>
          <div></div>
          <Button onClick={this.reset} variant="contained" color="secondary">
            Reset
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

export default StaticSpeedReader;
