import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';


const scaleFadeWhite = keyframes`
  0% {
    background-color: rgba(255, 255, 255, 0);
    transform: scale(0);
  }
  5% {
    background-color: rgba(255, 255, 255, 1);
  }
  100% {
    background-color: rgba(255, 255, 255, 0);
    transform: scale(1);
  }
`;

const scaleFadeBlack = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0);
    transform: scale(0);
  }
  5% {
    background-color: rgba(0, 0, 0, 1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
    transform: scale(1);
  }
`;

const animation = props => css`
  ${ (props.appearance === 'light' && !props.takeover) || (props.appearance === 'dark' && props.takeover) ? scaleFadeWhite : scaleFadeBlack } 1.3s 0s linear infinite;
`;

// Styling
const StyledLoader = styled.div`
  box-sizing: border-box;
  position: relative;
  height: ${ props => props.size }px;
  width: ${ props => props.size }px;
  will-change: transform, opacity;
  ${ props => (props.position === 'absolute' || props.takeover ? `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);` : 'margin: 0 auto;') }
  &:before,
  &:after,
  div {
    content: '';
    will-change: transform, opacity;
    border-radius: 100%;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -${ props => props.size / 2 }px;
    width: ${ props => props.size }px;
    height: ${ props => props.size }px;
    animation: ${ animation };
  }
  &:before {
    animation-delay: -0.4s;
  }
  &:after {
    animation-delay: -0.2s;
  }
`;

const Pulse = (props) => {
  return <StyledLoader { ...props } data-testid='pulse-loader'><div /></StyledLoader>;
};

// Default props
Pulse.defaultProps = {
  size: 60,
  margin: '0',
  appearance: 'dark',
  position: 'static'
};

// Prop type check
Pulse.propTypes = {
  size: PropTypes.number,
  margin: PropTypes.string,
  appearance: PropTypes.oneOf(['dark', 'light']),
  position: PropTypes.oneOf(['static', 'absolute'])
};

export default Pulse;