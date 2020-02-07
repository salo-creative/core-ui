import React from 'react';
import PropTypes from 'prop-types';

const StyleButton = props => {
  const { style, active, label } = props;

  const onToggle = (event) => {
    event.preventDefault();
    props.onToggle(style);
  };

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }
  
  return (
    <button
      type='button'
      className={ className }
      onMouseDown={ onToggle }
    >
      { label }
    </button>
  );
};

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default StyleButton;