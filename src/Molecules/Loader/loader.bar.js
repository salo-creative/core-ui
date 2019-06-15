import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const stretchDelay = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
  }
`;

const animation = () => css`
  ${ stretchDelay } 1.2s infinite ease-in-out;
`;

// Styling
const StyledLoader = styled.div`
  width: ${ ({ size }) => size }px;
  height: ${ ({ size }) => size }px;
  text-align: center;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  ${ ({ position, takeover }) => (position === 'absolute' || takeover ? `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);` : 'margin: 0 auto;') }
  > div {
    background-color: ${ ({ appearance, takeover }) => ((appearance === 'dark' && !takeover) || (appearance === 'light' && takeover) ? '#000' : '#fff') };
    height: 100%;
    width: ${ ({ size }) => Math.ceil(size * 0.1333) }px;
    display: flex;
    animation: ${ animation }
  }
  .rect2 {
    animation-delay: -1.1s;
  }
  .rect3 {
    animation-delay: -1.0s;
  }
  .rect4 {
    animation-delay: -0.9s;
  }
  .rect5 {
    animation-delay: -0.8s;
  }
`;

const Bar = (props) => {
  return (
    <StyledLoader { ...props } data-testid='bar-loader'>
      <div className='rect1' />
      <div className='rect2' />
      <div className='rect3' />
      <div className='rect4' />
      <div className='rect5' />
    </StyledLoader>
  );
};

// Default props
Bar.defaultProps = {
  size: 100,
  appearance: 'dark',
  position: 'static'
};

// Prop type check
Bar.propTypes = {
  size: PropTypes.number,
  appearance: PropTypes.oneOf(['dark', 'light']),
  position: PropTypes.oneOf(['static', 'absolute'])
};

export default Bar;