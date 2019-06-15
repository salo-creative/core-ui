import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledUl = styled.ul`
  font-weight: 400;
  width: 100%;
  color: ${ ({ color }) => color };
  margin: ${ ({ margin }) => margin };
  padding: ${ ({ padding }) => padding };

  ${ ({ fontSize, lineHeight, minFont, maxFont, minLine, maxLine }) => {
    if (fontSize === '') {
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

const Ul = ({ children, ...props }) => {
  return <StyledUl { ...props }>{ children }</StyledUl>;
};

Ul.propTypes = {
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

Ul.defaultProps = {
  color: '#262729',
  fontSize: '',
  lineHeight: '',
  margin: '0 0 20px',
  padding: '0 0 0 25px',
  minFont: 14,
  maxFont: 17,
  minLine: 17,
  maxLine: 29
};

Ul.displayName = 'Ul';

export default Ul;