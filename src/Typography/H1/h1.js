import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledH1 = styled.h1`
  width: 100%;
  color: ${ ({ color, theme }) => color || theme.font };
  text-align: ${ ({ align }) => align };
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
`;

const H1 = ({ children, ...props }) => {
  return <StyledH1 { ...props }>{ children }</StyledH1>;
};

H1.propTypes = {
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

H1.defaultProps = {
  color: '',
  align: 'left',
  fontSize: '',
  lineHeight: '',
  margin: '30px 0 10px',
  padding: '0',
  minFont: 40,
  maxFont: 60,
  minLine: 42,
  maxLine: 67
};

H1.displayName = 'H1';

export default H1;