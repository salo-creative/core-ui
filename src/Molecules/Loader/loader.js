import React from 'react';
import PropTypes from 'prop-types';

import Pulse from './loader.pulse';
import Bar from './loader.bar';
import { Background } from './loader.styles';

// component
const Loader = (props) => {
  const { display, loaderProps, takeover, type, appearance } = props;

  const renderTakeover = () => {
    if (takeover && display) {
      return <Background appearance={ appearance } data-testid='loader-takeover' />;
    }
    return null;
  };

  const renderLoader = () => {
    if (!display) return null;
    switch (type) {
      case 'bar': {
        return (
          <Bar
            { ...loaderProps }
            takeover={ takeover }
            appearance={ appearance }
          />
        );
      }
      case 'pulse':
      default: {
        return (
          <Pulse
            { ...loaderProps }
            takeover={ takeover }
            appearance={ appearance }
          />
        );
      }
    }
  };

  return (
    <React.Fragment>
      { renderTakeover() }
      { renderLoader() }
    </React.Fragment>
  );
};

Loader.defaultProps = {
  display: false,
  takeover: false,
  appearance: 'dark',
  type: 'pulse',
  loaderProps: {}
};

Loader.propTypes = {
  display: PropTypes.bool,
  takeover: PropTypes.bool,
  appearance: PropTypes.oneOf(['dark', 'light']),
  type: PropTypes.oneOf(['pulse', 'bar']),
  loaderProps: PropTypes.object
};

export default Loader;