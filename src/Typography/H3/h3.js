import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledH3 = styled.h3`
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

const H3 = ({ children, ...props }) => {
  return <StyledH3 { ...props }>{ children }</StyledH3>;
};

H3.propTypes = {
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

H3.defaultProps = {
  color: '',
  align: 'left',
  fontSize: '',
  lineHeight: '',
  margin: '30px 0 10px',
  padding: '0',
  minFont: 17,
  maxFont: 27,
  minLine: 27,
  maxLine: 34
};

H3.displayName = 'H3';

export default H3;