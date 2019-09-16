import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import CheckBox from '../CheckBox';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import Label from '../components/Label';
import { Group, GroupWrapper } from './radio.styles';

class Radio extends React.Component {
  render() {
    const {
      className,
      disabled,
      options,
      error,
      errorMessage,
      helperText,
      label,
      name,
      margin,
      onChange,
      required,
      size,
      value
    } = this.props;
    return (
      <Group
        className={ className }
        margin={ margin }
      >
        <Label
          error={ error }
          label={ label }
          name={ name }
          required={ required }
          size={ size }
        />
        <GroupWrapper>
          { options.map((field, i) => {
            // Set margin equivalent to parent but hide for last item
            const checkMargin = i <= (options.length - 2) ? margin : '0';
            return (
              <CheckBox
                checked={ field.value === value }
                disabled={ disabled }
                label={ field.label }
                key={ field.value }
                margin={ checkMargin }
                name={ field.value }
                onChange={ ({ name: val }) => onChange(val) }
                radio
                size={ size }
              />
            );
          }) }
        </GroupWrapper>
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
      </Group>
    );
  }
}

Radio.defaultProps = {
  className: '',
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: 'Label Text',
  margin: '0 0 2rem 0',
  onChange: () => null,
  options: [],
  required: false,
  size: 'M',
  value: ''
};

Radio.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.string
};

export default Radio;