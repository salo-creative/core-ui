import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

// HELPERS
import { saloTheme } from '../helpers/colours';

const Theme = (props) => {
  const { children, theme } = props;
  return (
    <ThemeProvider theme={ { ...saloTheme, ...theme } }>
      { children }
    </ThemeProvider>
  );
};

Theme.defaultProps = { theme: {} };

Theme.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.object
};

export default Theme;