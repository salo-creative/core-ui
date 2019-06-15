import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import {
  RangeSliderOuterWrapper,
  RangeSliderInnerWrapper,
  Slider,
  ValueDisplay,
  ValWrapper
} from './range.styles';


const Range = (props) => {
  const {
    disabled,
    error,
    errorMessage,
    helperText,
    label,
    margin,
    max,
    min,
    name,
    onBlur,
    onChange,
    required,
    size,
    step,
    value
  } = props;

  const calculateHeight = () => {
    switch (size) {
      case 'M':
        return '4rem';
      case 'L':
      default:
        return '4.5rem';
    }
  };

  const height = calculateHeight();

  const renderSlider = () => {
    if (min < max) {
      return (
        <React.Fragment>
          <Slider
            aria-required={ required.toString() }
            aria-invalid={ error.toString() }
            disabled={ disabled }
            type='range'
            id={ name }
            name={ name }
            min={ min }
            max={ max }
            value={ value }
            onBlur={ (e) => onBlur({ e, value: e.target.value }) }
            onChange={ (e) => onChange({ e, value: e.target.value }) }
            step={ step }
          />
          <ValueDisplay size={ height }>
            { value }
          </ValueDisplay>
        </React.Fragment>
      );
    }

    return 'The min value cannot be higher than the max.';
  };

  return (
    <RangeSliderOuterWrapper
      margin={ margin }
    >
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
      />
      <RangeSliderInnerWrapper
        height={ height }
      >
        { renderSlider() }
      </RangeSliderInnerWrapper>
      <ErrorText
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </RangeSliderOuterWrapper>
  );
};

Range.defaultProps = {
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  onChange: () => null,
  required: false,
  step: PropTypes.number,
  size: 'M',
  value: '',
  min: 0,
  max: 100
};

Range.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number
};

export default Range;