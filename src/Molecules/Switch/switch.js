import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Loader from '../Loader';
import { SwitchWrapper, SwitchContainer, SwitchHandle, SwitchLabel, LoaderContainer } from './switch.styles';

const Switch = (props) => {
  const {
    disabled,
    justify,
    label,
    labelOff,
    labelPosition,
    loading,
    margin,
    onChange,
    size,
    value,
    width
  } = props;

  const isDisabled = disabled || loading;

  const renderLabel = () => {
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
      className={ labelPosition === 'right' ? 'alignRight' : 'alignLeft' }
      width={ width }
    >
      <SwitchContainer
        active={ value }
        onClick={ () => onChange(!value) }
        size={ size }
      >
        <SwitchHandle
          active={ value }
          size={ size }
        />
        { loading && (
          <LoaderContainer
            size={ size }
            active={ value }
          >
            <Loader
              display
              appearance='light'
              loaderProps={ { size: 25 } }
            />
          </LoaderContainer>
        ) }
      </SwitchContainer>
      <SwitchLabel size={ size }>{ renderLabel() }</SwitchLabel>
    </SwitchWrapper>
  );
};

Switch.defaultProps = {
  disabled: false,
  justify: '',
  label: '',
  labelOff: '',
  labelPosition: 'right',
  loading: false,
  margin: '0',
  size: 'M',
  value: false,
  width: 'auto'
};

Switch.propTypes = {
  disabled: PropTypes.bool,
  justify: PropTypes.string,
  label: PropTypes.string,
  labelOff: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  loading: PropTypes.bool,
  margin: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['L', 'M']),
  width: PropTypes.string
};

export default Switch;