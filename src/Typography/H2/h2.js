import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledH2 = styled.h2`
  width: 100%;
  color: ${ ({ color, theme }) => color || theme.black };
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

const H2 = ({ children, ...props }) => {
  return <StyledH2 { ...props }>{ children }</StyledH2>;
};

H2.propTypes = {
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

H2.defaultProps = {
  color: '',
  align: 'left',
  fontSize: '',
  lineHeight: '',
  margin: '30px 0 10px',
  padding: '0',
  minFont: 27,
  maxFont: 40,
  minLine: 31,
  maxLine: 47
};

H2.displayName = 'H2';

export default H2;