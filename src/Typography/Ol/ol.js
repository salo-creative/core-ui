import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledOl = styled.ol`
  font-weight: 400;
  width: 100%;
  color: ${ ({ color, theme }) => color || theme.font };
  margin: ${ ({ margin }) => margin };
  padding: ${ ({ padding }) => padding };

  ${ ({ fontSize, lineHeight, minFont, maxFont, minLine, maxLine }) => {
    if (fontSize === '' && lineHeight === '') {
      return `${ FluidType({ fontSize: [minFont, maxFont], lineHeight: [minLine, maxLine] }) }`;
    }
    return `
      font-size: ${ fontSize };
      line-height: ${ lineHeight };
    `;
  } }
  li p {
    margin: 0;
  }
`;

const Ol = ({ children, ...props }) => {
  return <StyledOl { ...props }>{ children }</StyledOl>;
};

Ol.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  minFont: PropTypes.number,
  minLine: PropTypes.number,
  maxFont: PropTypes.number,
  maxLine: PropTypes.number
};

Ol.defaultProps = {
  color: '',
  fontSize: '',
  lineHeight: '',
  margin: '0 0 20px',
  padding: '0 0 0 25px',
  minFont: 14,
  maxFont: 17,
  minLine: 17,
  maxLine: 29
};

Ol.displayName = 'Ol';

export default Ol;