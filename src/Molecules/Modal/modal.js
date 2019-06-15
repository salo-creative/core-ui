import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

// COMPONENTS & STYLES
import Core from './modal.core';

const Modal = (props) => {
  const { open, ...rest } = props;
  return (
    <Transition
      in={ open }
      timeout={ 200 }
      unmountOnExit
    >
      { state => (
        <Core
          transitionState={ state }
          { ...rest }
        />
      ) }
    </Transition>
  );
};

Modal.defaultProps = {
  bodyBackground: '#fff',
  children: '',
  closeOnBackdrop: true,
  closeOnEsc: true,
  footer: '',
  forceHeight: false,
  height: '100%',
  hideClose: false,
  hideHeader: false,
  mobileFullscreen: '58rem',
  outerPadding: true,
  padding: true,
  stickyFooter: false,
  stickyHeader: true,
  root: null,
  title: 'Modal title',
  transition: 'fade',
  transparent: 0.9,
  width: '58rem',
  open: false
};

Modal.propTypes = {
  bodyBackground: PropTypes.string,
  children: PropTypes.any,
  closeOnBackdrop: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  footer: PropTypes.any,
  forceHeight: PropTypes.bool,
  height: PropTypes.string,
  hideClose: PropTypes.bool,
  hideHeader: PropTypes.bool,
  mobileFullscreen: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  outerPadding: PropTypes.bool,
  padding: PropTypes.bool,
  root: PropTypes.element,
  stickyHeader: PropTypes.bool,
  stickyFooter: PropTypes.bool,
  title: PropTypes.string,
  transparent: PropTypes.number,
  transition: PropTypes.oneOf(['fade', 'slide', 'expand']),
  width: PropTypes.string,
  open: PropTypes.bool
};

export default Modal;