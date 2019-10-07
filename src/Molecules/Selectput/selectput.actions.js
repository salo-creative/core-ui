import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

const Actions = ({ disabled, handleSubmit, handleClose }) => (
  <React.Fragment>
    <button
      type='button'
      onClick={ handleSubmit }
      disabled={ disabled.submit }
      className='salo-selectput__button--submit'
    >
      <Icon icon='tick' size={ 16 } />
    </button>
    <button
      type='button'
      onClick={ handleClose }
      disabled={ disabled.close }
      className='salo-selectput__button--close'
    >
      <Icon icon='close' size={ 16 } />
    </button>
  </React.Fragment>
);

Actions.defaultProps = {
  disabled: {
    submit: false,
    close: false
  }
};

Actions.propTypes = {
  disabled: PropTypes.shape({
    submit: PropTypes.bool.isRequired,
    close: PropTypes.bool.isRequired
  }),
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Actions;