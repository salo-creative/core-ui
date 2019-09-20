import React from 'react';
import PropTypes from 'prop-types';
import { string } from 'yup';

// COMPONENTS & STYLES
import PasswordHelper from './password.helper';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';
import { passwordRegex } from '../../helpers/form';

const Password = (props) => {
  const {
    background,
    border,
    borderRadius,
    className,
    confirm,
    disabled,
    error,
    fontSize,
    margin,
    name,
    onChange,
    padding,
    required,
    showHelper,
    size,
    value,
    Input
  } = props;

  // Hold state of individual inputs within component
  const [state, setState] = React.useState({
    password: value,
    password_confirm: value,
    password_confirm_touched: false,
    matches: false
  });

  // On field blur we emit these back on the on change function to the
  // parent if fields match or not using the confirm functionality
  const handleBlur = () => {
    if (state.matches || !confirm) {
      onChange(state.password);
    }
  };

  // This is needed to trigger field validation when return is pressed to submit
  const handleKeyUp = ({ e }) => {
    if (e.keyCode === 13 && (state.matches || !confirm)) {
      handleBlur();
    }
  };

  const handleChange = ({ key, val }) => {
    // Check if passwords match
    let matches = false;
    let { password_confirm_touched } = state;
    if (key === 'password_confirm') {
      matches = val === state.password;
      password_confirm_touched = true;
    } else {
      matches = val === state.password_confirm;
    }
    setState({
      ...state,
      [key]: val,
      matches,
      password_confirm_touched
    });
  };

  const standardProps = {
    background,
    border,
    borderRadius,
    disabled,
    fontSize,
    margin,
    padding,
    size,
    onBlur: handleBlur,
    onKeyUp: handleKeyUp
  };

  return (
    <div className={ `password__wrapper ${ className }` }>
      <Input
        { ...standardProps }
        error={ error && !string().matches(new RegExp(passwordRegex)).required().isValidSync(state.password) }
        errorMessage='Your password is not valid'
        key={ `password_${ name }` }
        label='Password'
        name={ `password_${ name }` }
        placeholder='Enter a password'
        required={ required }
        type='password'
        value={ state.password }
        onChange={ ({ value: val }) => handleChange({ key: 'password', val }) }
      />
      { showHelper && <PasswordHelper password={ state.password } /> }
      { confirm && (
        <Input
          { ...standardProps }
          error={ !state.matches && (state.password_confirm_touched || error) }
          errorMessage='Your passwords do not match'
          key={ `password_confirm_${ name }` }
          label='Re-enter password'
          name={ `password_confirm_${ name }` }
          placeholder='Confirm password'
          required={ required }
          type='password'
          value={ state.password_confirm }
          onChange={ ({ value: val }) => handleChange({ key: 'password_confirm', val }) }
        />
      ) }
    </div>
  );
};

Password.defaultProps = {
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  className: '',
  confirm: true,
  disabled: false,
  error: false,
  fontSize: '1.4rem',
  Input: null,
  margin: '0 0 2rem',
  onChange: () => null,
  padding: '0 1rem',
  required: false,
  showHelper: true,
  size: 'M',
  value: ''
};

Password.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  confirm: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fontSize: PropTypes.string,
  Input: PropTypes.func,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  padding: PropTypes.string,
  required: PropTypes.bool,
  showHelper: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.string
};

export default Password;