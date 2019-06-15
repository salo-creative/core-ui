import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledH4 = styled.h4`
  width: 100%;
  color: ${ ({ color, theme }) => color || theme.font };
  text-align: ${ ({ align }) => align };
  margin: ${ ({ margin }) => margin };
  padding: ${ ({ padding }) => padding };
  font-weight: ${ ({ theme }) => theme.headerWeight };
  ${ ({ fontSize, lineHeight, minFont, maxFont, minLine, maxLine }) => {
    if (fontSize === '' && lineHeight === '') {
      return `${ FluidType({ fontSize: [minFont, maxFont], lineHeight: [minLine, maxLine] }) }`;
    }
    return `
      font-size: ${ fontSize };
      line-height: ${ lineHeight };
    `;
  } }
`;

const H4 = ({ children, ...props }) => {
  return <StyledH4 { ...props }>{ children }</StyledH4>;
};

H4.propTypes = {
  color: PropTypes.string,
  align: PropTypes.string,
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  minFont: PropTypes.number,
  minLine: PropTypes.number,
  maxFont: PropTypes.number,
  maxLine: PropTypes.number
};

H4.defaultProps = {
  color: '',
  align: 'left',
  fontSize: '',
  lineHeight: '',
  margin: '30px 0 10px',
  padding: '0',
  minFont: 14,
  maxFont: 23,
  minLine: 21,
  maxLine: 29
};

H4.displayName = 'H4';

export default H4;