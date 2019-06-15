import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

// HELPERS
import { colours } from '../helpers/colours';

const theme = {
  ...colours,
  // Typography
  bodyFont: '\'Open Sans\', sans-serif',
  headerFont: '\'sofia-pro\', sans-serif'
};

const Theme = (props) => {
  const { children } = props;
  return (
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  );
};

Theme.propTypes = { children: PropTypes.any.isRequired };

export default Theme;