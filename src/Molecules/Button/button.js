import React from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';
import { Link } from 'react-router-dom';
import Icon from '@salo/icons';

// COMPONENTS
import { ButtonWrapper } from './button.styles';
import Loader from '../Loader';

const Button = (props) => {
  const {
    children,
    circle,
    className,
    disabled,
    fullWidth,
    height,
    iconAfter,
    iconBefore,
    loading,
    padding,
    radius,
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
      case 'label':
        return 'label';
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

  // Add type for buttons and submits
  const buttonType = type === 'submit' || type === 'button' ? { type } : '';
  
  return (
    <ButtonWrapper
      { ...rest }
      { ...buttonType }
      className={ `${ className } ${ disabled ? 'disabled' : '' }` }
      circle={ circle.toString() }
      disabled={ disable }
      fullwidth={ fullWidth.toString() }
      loading={ loading.toString() }
      radius={ radius.toString() }
      padding={ padding }
      as={ evaluateElement() }
      height={ height }
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
  circle: false,
  className: '',
  disabled: false,
  fullWidth: false,
  height: '4rem',
  iconAfter: '',
  iconBefore: '',
  loading: false,
  padding: '0 1.5rem',
  radius: true,
  shadow: 'default',
  type: 'button'
};

Button.propTypes = {
  align: PropTypes.oneOf(['center', 'start', 'flex-end', 'space-between']),
  appearance: PropTypes.string,
  children: PropTypes.any,
  circle: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  height: PropTypes.string,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  loading: PropTypes.bool,
  padding: PropTypes.string,
  radius: PropTypes.bool,
  shadow: PropTypes.oneOf(['small', 'default', 'large', 'none']),
  type: PropTypes.oneOf(['button', 'Link', 'submit', 'a', 'label'])
};

export default Button;