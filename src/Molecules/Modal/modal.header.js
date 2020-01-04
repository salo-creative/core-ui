import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

import { HeaderWrapper, Close, Title } from './modal.styles';

const Header = (props) => {
  const { stickyHeader, title, hideClose, hideHeader, handleClose } = props;
  if (hideHeader && hideClose) return null;
  if (hideHeader) {
    return (
      <Close
        top='5px'
        theme='inverse'
        onClick={ e => handleClose(e) }
      >
        <Icon size={ 14 } icon='close' />
      </Close>
    );
  }
  return (
    <HeaderWrapper
      className='salo-modal__header'
      sticky={ stickyHeader }
    >
      <Title>{ title }</Title>
      { !hideClose && (
        <Close
          className='salo-modal__close'
          top='50%'
          theme='inverse'
          onClick={ e => handleClose(e) }
        >
          <Icon size={ 14 } icon='close' />
        </Close>
      ) }
    </HeaderWrapper>
  );
};

Header.defaultProps = {
  hideClose: false,
  stickyHeader: true,
  title: 'Modal title'
};

Header.propTypes = {
  handleClose: PropTypes.func.isRequired,
  hideClose: PropTypes.bool,
  hideHeader: PropTypes.bool.isRequired,
  stickyHeader: PropTypes.bool,
  title: PropTypes.string
};

export default Header;