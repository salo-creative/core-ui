import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  flex: ${ props => props.flex };
  flex-direction: ${ props => props.flexDirection };
  flex-wrap: ${ props => props.flexWrap };
  align-items: ${ props => props.alignItems };
  justify-content: ${ props => props.justifyContent };
  padding: ${ props => props.padding };
`;

const Row = ({ children, ...props }) => {
  return <StyledRow { ...props }>{ children }</StyledRow>;
};

Row.defaultProps = {
  alignItems: 'flex-start',
  flex: '0 1 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  padding: '0 0 0 0'
};

Row.propTypes = {
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'unset']),
  flex: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['wrap', 'no-wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf(['space-between', 'center', 'flex-start', 'flex-end']),
  padding: PropTypes.string
};

export default Row;