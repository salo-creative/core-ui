import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Loader from '../Loader';
import {
  SwitchWrapper,
  SwitchContainer,
  SwitchHandle,
  SwitchLabel,
  LoaderContainer
} from './switch.styles';

const Switch = (props) => {
  const {
    className,
    disabled,
    justify,
    label,
    labelOff,
    labelPosition,
    loading,
    margin,
    name,
    onChange,
    showBoth,
    size,
    transition,
    value,
    width
  } = props;

  const isDisabled = disabled || loading;

  const renderLabel = () => {
    if (showBoth) return label;
    if (!value && labelOff) {
      return labelOff;
    }
    return label;
  };

  return (
    <SwitchWrapper
      justify={ justify }
      disabled={ isDisabled }
      size={ size }
      margin={ margin }
      className={ `${ className } salo-switch ${ labelPosition === 'right' ? 'alignRight' : 'alignLeft' }` }
      width={ width }
    >
      { showBoth && (
        <SwitchLabel
          className={ `salo-switch__label left ${ !value ? 'active' : '' }` }
          size={ size }
          htmlFor={ name }
        >
          { labelOff || label }
        </SwitchLabel>
      ) }
      <SwitchContainer
        active={ value }
        onClick={ () => onChange(!value) }
        size={ size }
        id={ name }
        role='switch'
        ariaChecked={ `${ !!value }` }
        className={ `salo-switch__container salo-switch__container--${ value ? 'active' : 'inactive' }` }
      >
        <SwitchHandle
          active={ value }
          size={ size }
          className='salo-switch__handle'
          hasTransition={ transition }
        />
        { loading && (
          <LoaderContainer
            size={ size }
            active={ value }
            className='salo-switch__loader'
          >
            <Loader
              display
              appearance='light'
              loaderProps={ {
                size: 25
              } }
            />
          </LoaderContainer>
        ) }
      </SwitchContainer>
      <SwitchLabel
        className={ `salo-switch__label ${ value ? 'active' : '' }` }
        size={ size }
        htmlFor={ name }
      >
        { renderLabel() }
      </SwitchLabel>
    </SwitchWrapper>
  );
};

Switch.defaultProps = {
  className: '',
  disabled: false,
  justify: '',
  label: '',
  labelOff: '',
  labelPosition: 'right',
  loading: false,
  margin: '0',
  showBoth: true,
  size: 'M',
  transition: 'left 0.3s ease-in-out',
  value: false,
  width: 'auto'
};

Switch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  justify: PropTypes.string,
  label: PropTypes.string,
  labelOff: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  loading: PropTypes.bool,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showBoth: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  transition: PropTypes.string,
  value: PropTypes.bool,
  width: PropTypes.string
};

export default Switch;