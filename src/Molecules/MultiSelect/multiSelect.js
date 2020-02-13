import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, find, get } from 'lodash';

// COMPONENTS & STYLES
import {
  MultiSelectWrapper,
  MultiSelectContainer,
  MultiSelectButton,
  MultiSelectPlaceholder,
  MultiSelectText
} from './multiSelect.styles';
import Label from '../../Forms/components/Label';
import ErrorText from '../../Forms/components/ErrorText';
import HelperText from '../../Forms/components/HelperText';
import Button from '../Button';
import MultiSelectDrop from './multiSelect.drop';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const MultiSelect = ({
  background,
  border,
  borderRadius,
  className,
  dropHeight,
  disabled,
  error,
  errorMessage,
  fontSize,
  helperText,
  icon,
  keyLabel,
  keyValue,
  label,
  margin,
  name,
  onChange,
  options,
  optionsLoading,
  optionsError,
  padding,
  placeholder,
  required,
  size,
  value
}) => {
  const [open, toggleOpen] = React.useState(false);

  const node = React.useRef();

  React.useEffect(() => {
    // Handle close on escape press
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        toggleOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    // Handle click outside
    const handleClickOutside = (e) => {
      if (!node.current.contains(e.target)) {
        toggleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Process text for rendering
  const renderText = () => {
    if (isEmpty(value)) {
      return <MultiSelectPlaceholder className='salo-multi-select__placeholder'>{ placeholder }</MultiSelectPlaceholder>; // If nothing selected return the placeholder
    }
    const valueString = value.map(item => {
      return get(find(options, {
        [keyValue]: item
      }), `[${ keyLabel }]`);
    })
      .filter(i => i)
      .join(', ');

    return <MultiSelectText className='salo-multi-select__values'>{ valueString }</MultiSelectText>;
  };

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
    <MultiSelectWrapper
      className={ `salo-multi-select ${ className }` }
      margin={ margin }
      ref={ node }
    >
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
        className='salo-multi-select__label'
      />
      <MultiSelectContainer className='salo-multi-select__container'>
        <MultiSelectButton
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          className='salo-multi-select__button'
          disabled={ disabled }
          error={ error }
          fontSize={ fontSize }
          height={ height() }
          fixedWidth='100%'
          padding={ padding }
        >
          <Button
            disabled={ disabled }
            shadow='none'
            fullWidth
            iconAfter={ icon }
            onClick={ () => toggleOpen(!open) }
            useInk={ false }
          >
            { renderText() }
          </Button>
        </MultiSelectButton>
        <MultiSelectDrop
          dropHeight={ dropHeight }
          keyLabel={ keyLabel }
          keyValue={ keyValue }
          open={ open }
          options={ options }
          optionsLoading={ optionsLoading }
          optionsError={ optionsError }
          onApply={ (val) => onChange({
            value: val
          }) }
          close={ () => toggleOpen(false) }
          value={ value }
        />
      </MultiSelectContainer>
      <ErrorText
        className='salo-multi-select__error'
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-multi-select__helper'
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </MultiSelectWrapper>
  );
};

MultiSelect.defaultProps = {
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  className: '',
  disabled: false,
  dropHeight: '16rem',
  error: false,
  errorMessage: 'Field invalid',
  fontSize: '1.4rem',
  helperText: '',
  icon: null,
  keyValue: 'value',
  keyLabel: 'label',
  label: '',
  margin: '0 0 2rem',
  onChange: () => null,
  options: [],
  optionsError: false,
  optionsLoading: false,
  padding: '0 1rem',
  placeholder: 'Please select…',
  required: false,
  size: 'M',
  value: []
};

MultiSelect.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dropHeight: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fontSize: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.string,
  keyValue: PropTypes.string, // Where in object to get value from
  keyLabel: PropTypes.string, // Where on option object to get label from
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  optionsError: PropTypes.bool, // Did loading options error
  optionsLoading: PropTypes.bool, // Are the options loading?
  padding: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.array
};

export default MultiSelect;