  
import React from 'react';
import { delay } from 'lodash';

// STYLES
import { Wrapper, Path, PolyLine } from './animatedTick.styles';

class AnimatedTick extends React.Component {
  state = { show: false }

  componentDidMount = () => {
    delay(this.animateTick, 1);
  }

  animateTick = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { show } = this.state;
    return (
      <Wrapper className={ show ? 'active' : '' }>
        <svg
          x='0px'
          y='0px'
          viewBox='0 0 37 37'
          style={ { 'enableBackground': 'new 0 0 37 37' } }
          xmlSpace='preserve'
        >
          <Path d='M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z' />
          <PolyLine points=' 11.6,20 15.9,24.2 26.4,13.8 ' />
        </svg>
      </Wrapper>
    );
  }
}

export default AnimatedTick;