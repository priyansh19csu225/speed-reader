import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SEPARATOR = 'µ';
const splitRegex = /([\s,|;|\s|\n|\t|\r]+)/gi;
const splitText = (text) => {
  const textWithSeparator = text.replace(splitRegex, `$1${SEPARATOR}`);
  return textWithSeparator.split(SEPARATOR);
};
const calculateTickSpeed = (wpm) => {
  return (1 / (wpm / 60)) * 1000;
};

class SpeedReader2 extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      activeWord: -1,
      isReading: false,
      startTick: null,
      lastTick: null,
      percentageRead: 0,
    };
    this.animationFrame = null;
    this.tick = this.tick.bind(this);
    this.state = this.initialState;
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    if (!!this.props.autoStart) {
      this.start();
    }
  }

  componentWillUnmount() {
    this.setState({ isReading: false });
    cancelAnimationFrame(this.animationFrame);
  }

  tick() {
    if (!this.state.isReading) return;
    const tickSpeed = calculateTickSpeed(this.props.wpm || 300);
    const now = new Date().getTime();
    let activeWord = this.state.activeWord;

    if (!this.state.firstTick) {
      this.setState({ firstTick: now });
    }
    if (!this.state.lastTick) {
      this.setState({ lastTick: now });
    }
    const words = splitText(this.props.article);
    if (this.state.firstTick === now || this.state.lastTick + tickSpeed < now) {
      if (activeWord >= words.length) {
        this.setState({ isReading: false });
        this.ticker = null;
        if (this.props.onFinish) {
          this.props.onFinish();
        }
        if (this.props.loopModus) {
          this.setState({ activeWord: 0 });
          return this.start();
        } else {
          return this.setState(this.initialState);
        }
      } else {
        const percentageRead = ((activeWord + 1) / words.length) * 100;
        this.setState({
          activeWord: activeWord + 1,
          lastTick: now,
          percentageRead,
        });
        console.log(percentageRead);
        if (this.props.onPercentageRead)
          this.props.onPercentageRead(percentageRead.toFixed(0));
      }
      this.active && this.active.scrollIntoViewIfNeeded();
    }

    this.animationFrame = requestAnimationFrame(this.tick);
  }

  start() {
    const words = splitText(this.props.article);
    if (this.state.activeWord >= words.length) {
      this.setState(this.initialState);
    }
    this.setState({ isReading: true });
    this.animationFrame = requestAnimationFrame(this.tick);
  }

  pause() {
    if (this.props.pauseDisabled) {
      return;
    }
    this.setState({ isReading: false });
    this.ticker = null;
  }

  percentage() {
    return this.state.percentageRead;
  }

  render() {
    const { activeWord, isReading, percentageRead } = this.state;
    const {
      article,
      style,
      readStyle,
      readClass,
      activeStyle,
      activeClass,
      unreadStyle,
      unreadClass,
    } = this.props;
    const words = splitText(article);

    return (
      <article
        ref={(el) => {
          this.parent = el;
        }}
        style={style}
        onClick={() => (!isReading ? this.start() : this.pause())}
      >
        {words.map((word, index) => (
          <span
            key={index}
            style={
              index === activeWord
                ? activeStyle
                : index > activeWord
                ? unreadStyle
                : readStyle
            }
            ref={(el) => index === activeWord && (this.active = el)}
            className={
              index === activeWord
                ? activeClass
                : index > activeWord
                ? unreadClass
                : readClass
            }
          >
            {word}
            {word.match(/[\n|\r]/g) && word.match(/[\n|\r]/g).map(() => <br />)}
          </span>
        ))}
      </article>
    );
  }
}
SpeedReader2.propTypes = {
  autoStart: PropTypes.bool,
  loopModus: PropTypes.bool,
  pauseDisabled: PropTypes.bool,
  article: PropTypes.string,
  wpm: PropTypes.number,
  readClass: PropTypes.string,
  unreadClass: PropTypes.string,
  activeClass: PropTypes.string,
  style: PropTypes.object,
  readStyle: PropTypes.object,
  unreadStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  onPercentageRead: PropTypes.func,
};
export default SpeedReader2;
