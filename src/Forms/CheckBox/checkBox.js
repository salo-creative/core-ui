import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import { Wrapper, HiddenCheckBox, StyledCheckBox, CheckBoxLabel } from './checkBox.styles';

class CheckBox extends React.Component {
  handleCheckboxChange = (e) => {
    const { checked, disabled, label, name, onChange } = this.props;
    e.preventDefault();

    if (disabled) return;
    onChange({ checked: !checked, label, name });
  }

  render() {
    const {
      checked, disabled, error, errorMessage, helperText, label, margin, name, required, radio, size
    } = this.props;
    
    return (
      <Wrapper
        margin={ margin }
      >
        <CheckBoxLabel
          onClick={ this.handleCheckboxChange }
          disabled={ disabled }
          size={ size }
        >
          <HiddenCheckBox defaultChecked={ checked } name={ name } />
          <StyledCheckBox
            className={ `styled-checkbox ${ checked ? 'checked' : '' }` }
            checked={ checked }
            borderRadius={ radio ? '50%' : '3px' }
            width={ size === 'L' ? '2.5rem' : '2rem' }
          >
            <svg viewBox='0 0 24 24'>
              { radio ? <circle cx='50%' cy='50%' r='4' fill='white' /> : <polyline points='20 6 9 17 4 12' /> }
            </svg>
          </StyledCheckBox>
          { label }{ required && <sup>*</sup> }
        </CheckBoxLabel>
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
      </Wrapper>
    );
  }
}

CheckBox.defaultProps = {
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  margin: '0 0 2rem 0',
  onChange: () => null,
  radio: false,
  required: false,
  size: 'M'
};

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  radio: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default CheckBox;