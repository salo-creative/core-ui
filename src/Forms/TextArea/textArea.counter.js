import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Counter = ({ countTo, value }) => {
  const count = countTo - get(value, 'length') || 0;
  
  return (
    <p className='salo-textarea-counter'>
      { count } <span className='salo-textarea-counter-text'>characters</span>
    </p>
  );
};

Counter.propTypes = {
  countTo: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired
};

export default Counter;