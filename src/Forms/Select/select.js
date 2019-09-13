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
    className,
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
    <OuterSelectWrapper margin={ margin } className={ `salo-select ${ className }` }>
      <Label
        className='salo-select__label'
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
      />
      <SelectWrapper
        background={ background }
        error={ error }
        className='salo-select__wrapper'
      >
        <Selector
          aria-required={ required.toString() }
          aria-invalid={ error.toString() }
          border={ border.toString() }
          className='salo-select__field'
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
        className='salo-select__error'
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-select__helper'
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
  className: '',
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  iconAfter: true,
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  onChange: null,
  required: false,
  size: 'M',
  value: ''
};

Select.propTypes = {
  background: PropTypes.string,
  border: PropTypes.bool,
  children: PropTypes.array,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  iconAfter: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Select;