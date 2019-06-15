import React from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';
import { Link } from 'react-router-dom';
import Icon from '@salo/icons';

// COMPONENTS
import { ButtonWrapper } from './button.styles';
import Loader from '../Loader';

// HELPERS
import { buttonThemes } from '../../helpers/colours';

const Button = (props) => {
  const {
    children,
    disabled,
    fullWidth,
    iconAfter,
    iconBefore,
    loading,
    radius,
    size,
    type,
    ...rest
  } = props;

  const disable = loading || disabled;

  const evaluateElement = () => {
    switch (type) {
      case 'Link':
        return Link;
      case 'a':
        return 'a';
      case 'button':
      case 'submit':
      default:
        return 'button';
    }
  };

  const renderIconBefore = () => {
    if (!iconBefore) return null;
    return <Icon margin={ children ? '0 1rem 0 0' : '0' } icon={ iconBefore } />;
  };

  const renderIconAfter = () => {
    if (!iconAfter) return null;
    return <Icon margin={ children ? '0 0 0 1rem' : '0' } icon={ iconAfter } />;
  };
  
  return (
    <ButtonWrapper
      { ...rest }
      disabled={ disable }
      fullwidth={ fullWidth.toString() }
      loading={ loading.toString() }
      radius={ radius.toString() }
      as={ evaluateElement() }
      size={ size }
    >
      <Ink />
      { loading && (
        <Loader
          display={ true }
          loaderProps={ { size: 40, position: 'absolute' } }
          appearance='light'
        />
      ) }
      { renderIconBefore() }
      { children }
      { renderIconAfter() }
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  align: 'center',
  appearance: 'primary',
  children: '',
  disabled: false,
  fullWidth: false,
  iconAfter: '',
  iconBefore: '',
  loading: false,
  radius: true,
  shadow: 'default',
  size: 'M',
  type: 'button'
};

Button.propTypes = {
  align: PropTypes.oneOf(['center', 'start', 'flex-end', 'space-between']),
  appearance: PropTypes.oneOf(Object.keys(buttonThemes)),
  children: PropTypes.any,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  loading: PropTypes.bool,
  radius: PropTypes.bool,
  shadow: PropTypes.oneOf(['small', 'default', 'large', 'none']),
  size: PropTypes.oneOf(['L', 'M']),
  type: PropTypes.oneOf(['button', 'Link', 'submit', 'a'])
};

export default Button;