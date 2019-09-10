import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { SelectWrapper, Selector, IconAfter, OuterSelectWrapper } from './select.styles';
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';

// HELPERS
import { colours } from '../../helpers/colours';

const Select = (props) => {
  const {
    background,
    border,
    children,
    disabled,
    error,
    errorMessage,
    helperText,
    iconAfter,
    label,
    margin,
    name,
    onBlur,
    onChange,
    required,
    size,
    value
  } = props;

  const height = () => {
    switch (size) {
      case 'M':
        return '4rem';
      case 'L':
      default:
        return '4.5rem';
    }
  };

  return (
    <OuterSelectWrapper margin={ margin }>
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
      />
      <SelectWrapper
        background={ background }
        error={ error }
      >
        <Selector
          aria-required={ required.toString() }
          aria-invalid={ error.toString() }
          border={ border.toString() }
          disabled={ disabled }
          error={ error }
          height={ height() }
          id={ name }
          name={ name }
          onBlur={ e => onBlur({ e, value: e.target.value }) }
          onChange={ (e) => onChange({ e, value: e.target.value }) }
          value={ value }
        >
          { children }
        </Selector>
        { iconAfter && (
          <IconAfter error={ error }>
            <svg style={ { width: '24px', height: '24px' } } viewBox='0 0 24 24'>
              <path fill={ colours.darkGrey } d='M7,10L12,15L17,10H7Z' />
            </svg>
          </IconAfter>
        ) }
      </SelectWrapper>
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
    </OuterSelectWrapper>
  );
};

Select.propTypes = {
  children: PropTypes.array,
  disabled: PropTypes.bool,
  iconAfter: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Select.defaultProps = {
  background: colours.paleGrey,
  border: true,
  children: null,
  disabled: false,
  value: '',
  onChange: null,
  iconAfter: true,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  required: false,
  size: 'M'
};

Select.propTypes = {
  background: PropTypes.string,
  border: PropTypes.bool,
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.array,
  iconAfter: PropTypes.bool
};

export default Select;