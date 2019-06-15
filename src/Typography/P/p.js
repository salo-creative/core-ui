import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FluidType from '../../helpers/fluidType';

const StyledP = styled.p`
  font-weight: 400;
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

  em,
  i {
      font-style: italic;
  }

  b,
  strong {
      font-weight: bold;
  }

  a {
    font-size: 1em;
    color: currentColor;
    transition: color 0.3s;
    font-weight: 600;

    &:hover {
      transition: color 0.3s;
      color: #8f8f8f;
    }
  }
  pre {
    font-family: "Courier 10 Pitch", Courier, monospace;
    font-size: 95%;
    line-height: 140%;
    white-space: pre;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
  }

  code {
    font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
    font-size: 95%;
    line-height: 140%;
    white-space: pre;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    background: #faf8f0;
  }
`;

const P = ({ children, ...props }) => {
  return <StyledP { ...props }>{ children }</StyledP>;
};

P.propTypes = {
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

P.defaultProps = {
  color: '',
  align: 'left',
  fontSize: '',
  lineHeight: '',
  margin: '0 0 20px',
  padding: '0',
  minFont: 14,
  maxFont: 17,
  minLine: 17,
  maxLine: 29
};

P.displayName = 'P';

export default P;