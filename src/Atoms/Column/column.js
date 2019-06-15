import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

// HELPERS
import { getBreakpoint } from '../../helpers/breakpoints';

export function calculateSize(size, columns) {
  if (!size) return '';
  return `
    width: ${ ((size / columns) * 100) }%;
    flex-basis: ${ ((size / columns) * 100) }%;
    max-width: ${ ((size / columns) * 100) }%;
  `;
}

const StyledColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${ props => props.flexDirection };
  flex-grow: ${ props => props.flexGrow };
  flex-shrink: ${ props => props.flexShrink };
  flex-basis: ${ props => props.flexBasis };
  align-items: ${ props => props.alignItems };
  justify-content: ${ props => props.justifyContent };
  padding: ${ props => props.padding };

  /* Default size */
  ${ props => calculateSize(props.default, props.columns) }

  /* Phone size */
  ${ getBreakpoint({ min: 'phone' }) } {
    ${ props => calculateSize(props.phone, props.columns) };
  }

  /* Small size */
  ${ getBreakpoint({ min: 'small' }) } {
    ${ props => { return (`${ calculateSize(props.small, props.columns) }`); } }
  }

  /* Tablet size */
  ${ getBreakpoint({ min: 'tablet' }) } {
    ${ props => { return (`${ calculateSize(props.tablet, props.columns) }`); } }
  }

  /* Medium size */
  ${ getBreakpoint({ min: 'medium' }) } {
    ${ props => { return (`${ calculateSize(props.medium, props.columns) }`); } }
  }

  /* Large size */
  ${ getBreakpoint({ min: 'large' }) } {
    ${ props => { return (`${ calculateSize(props.large, props.columns) }`); } }
  }

  /* X Large size */
  ${ getBreakpoint({ min: 'xLarge' }) } {
    ${ props => calculateSize(props.xLarge, props.columns) }
  }
`;

const Column = ({ children, ...props }) => {
  return <StyledColumn { ...props }>{ children }</StyledColumn>;
};

Column.defaultProps = {
  alignItems: 'flex-start',
  columns: 12,
  default: 12,
  flexBasis: '0%',
  flexDirection: 'column',
  flexGrow: '1',
  flexShrink: '0',
  justifyContent: 'flex-start',
  padding: '10px',
  phone: null,
  small: null,
  tablet: null,
  medium: null,
  large: null,
  xLarge: null
};

Column.propTypes = {
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  columns: PropTypes.number,
  default: PropTypes.number,
  flexBasis: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexGrow: PropTypes.string,
  flexShrink: PropTypes.string,
  justifyContent: PropTypes.oneOf(['space-between', 'center', 'flex-start', 'flex-end']),
  padding: PropTypes.string,
  phone: PropTypes.number,
  small: PropTypes.number,
  tablet: PropTypes.number,
  medium: PropTypes.number,
  large: PropTypes.number,
  xLarge: PropTypes.number
};

export default Column;