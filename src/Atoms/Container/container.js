import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-width: ${ props => props.width };
  padding: ${ props => props.padding };
`;

const Container = ({ children, ...props }) => {
  return <StyledContainer { ...props }>{ children }</StyledContainer>;
};

Container.defaultProps = {
  padding: '10px',
  width: '1280px'
};

Container.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.string
};

export default Container;