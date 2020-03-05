import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import CheckBox from '../CheckBox';
import SaloInput from '../Input';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import Label from '../components/Label';
import { Group, GroupWrapper } from './radio.styles';

const Radio = props => {
  const {
    className,
    disabled,
    options,
    error,
    errorMessage,
    helperText,
    Input,
    label,
    name,
    margin,
    onChange,
    required,
    size,
    value
  } = props;

  const [other, setOther] = React.useState('');
  const [checked, setChecked] = React.useState(value);
  const inputEl = React.useRef();

  React.useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });

  return (
    <Group
      className={ `${ className } salo-radio` }
      margin={ margin }
    >
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
        className='salo-radio__label'
      />
      <GroupWrapper className='salo-radio__wrapper'>
        { options.map((field, i) => {
          // Set margin equivalent to parent but hide for last item
          const checkMargin = i <= (options.length - 2) ? margin : '0';
          return (
            <React.Fragment key={ field.value }>
              <CheckBox
                checked={ field.value === checked }
                disabled={ disabled }
                label={ field.label }
                margin={ checkMargin }
                name={ field.value }
                onChange={ ({ name: val }) => {
                  onChange(val);
                  setChecked(val);
                  setOther('');
                } }
                radio
                size={ size }
              />
              { field.value === checked && field.input && (
                <Input
                  className='salo-radio__input'
                  margin='1rem 0 0'
                  ref={ inputEl }
                  name={ `${ name }-input` }
                  onBlur={ () => {
                    onChange(other);
                  } }
                  onChange={ ({ value: val }) => {
                    setOther(val);
                  } }
                  value={ other }
                />
              ) }
            </React.Fragment>
          );
        }) }
      </GroupWrapper>
      <ErrorText
        className='salo-radio__error'
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-radio__helper'
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </Group>
  );
};

Radio.defaultProps = {
  className: '',
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  Input: SaloInput,
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
  Input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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