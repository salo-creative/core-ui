import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

const Actions = ({ disabled, handleSubmit, handleClose }) => (
  <React.Fragment>
    <button
      type='button'
      onClick={ handleSubmit }
      disabled={ disabled[0] }
      className='salo-selectput__button--submit'
    >
      <Icon icon='tick' size={ 16 } />
    </button>
    <button
      type='button'
      onClick={ handleClose }
      disabled={ disabled[1] }
      className='salo-selectput__button--close'
    >
      <Icon icon='close' size={ 16 } />
    </button>
  </React.Fragment>
);

Actions.defaultProps = { disabled: [false, false] };

Actions.propTypes = {
  disabled: PropTypes.arrayOf(PropTypes.bool),
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Actions;