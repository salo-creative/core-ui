import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// HELPERS
import { colours } from '../../helpers/colours';

const StyledDivider = styled.hr`
  border: 0;
  background: ${ ({ color }) => color };
  height: ${ ({ height }) => `${ height }px` };
  margin: ${ ({ margin }) => margin };
`;

const Divider = (props) => {
  return <StyledDivider { ...props } />;
};

Divider.defaultProps = {
  color: colours.grey,
  height: 1,
  margin: '2rem 0'
};

Divider.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.string
};

export default Divider;