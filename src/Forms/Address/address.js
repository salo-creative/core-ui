import React from 'react';
import PropTypes from 'prop-types';
import { string } from 'yup';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

import CoreInput from '../Input';

const allowedFields = ['line2', 'county', 'country'];

const Address = (props) => {
  const {
    background,
    border,
    borderRadius,
    className,
    disabled,
    error,
    fields,
    fontSize,
    margin,
    name,
    onChange,
    padding,
    required,
    size,
    value,
    Input
  } = props;

  // Hold state of individual inputs within component
  const [state, setState] = React.useState({
    line1: '',
    line2: '',
    city: '',
    county: '',
    postcode: '',
    country: '',
    ...value
  });

  React.useEffect(() => {
    // Update state if new external values are provided.
    setState((prev) => ({ ...prev, ...value }));
  }, [value]);

  // On field blur we emit these back on the on change function to the parent
  const handleBlur = () => {
    onChange(state);
  };

  // This is needed to trigger field validation when return is pressed to submit
  const handleKeyUp = ({ e }) => {
    if (e.keyCode === 13) {
      handleBlur();
    }
  };

  const handleChange = ({ key, val }) => {
    setState({
      ...state,
      [key]: val
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

  const AddressInput = Input || CoreInput;

  return (
    <div className={ `address__wrapper ${ className }` }>
      <AddressInput
        { ...standardProps }
        error={ error && !string().required().isValidSync(state.line1) }
        errorMessage='The first line of address is required'
        key={ `line1_${ name }` }
        label='Address line 1'
        name={ `line1_${ name }` }
        placeholder='Enter address line 1'
        required={ required }
        value={ state.line1 }
        onChange={ ({ value: val }) => handleChange({ key: 'line1', val }) }
      />
      { fields.includes('line2') && (
        <AddressInput
          { ...standardProps }
          error={ error && !string().isValidSync(state.line2) }
          key={ `line2_${ name }` }
          label='Address line 2'
          name={ `line2_${ name }` }
          placeholder='Enter address line 2'
          value={ state.line2 }
          onChange={ ({ value: val }) => handleChange({ key: 'line2', val }) }
        />
      ) }
      <AddressInput
        { ...standardProps }
        error={ error && !string().required().isValidSync(state.city) }
        errorMessage='A city is required'
        key={ `city_${ name }` }
        label='City'
        name={ `city_${ name }` }
        placeholder='Enter a city'
        required={ required }
        value={ state.city }
        onChange={ ({ value: val }) => handleChange({ key: 'city', val }) }
      />
      { fields.includes('county') && (
        <AddressInput
          { ...standardProps }
          error={ error && !string().isValidSync(state.county) }
          key={ `county_${ name }` }
          label='County'
          name={ `county_${ name }` }
          placeholder='Enter a county'
          value={ state.county }
          onChange={ ({ value: val }) => handleChange({ key: 'county', val }) }
        />
      ) }
      <AddressInput
        { ...standardProps }
        error={ error && !string().required().isValidSync(state.postcode) }
        errorMessage='A valid postcode is required'
        key={ `postcode_${ name }` }
        label='Postcode'
        name={ `postcode_${ name }` }
        placeholder='Enter a postcode'
        required={ required }
        value={ state.postcode }
        onChange={ ({ value: val }) => handleChange({ key: 'postcode', val }) }
      />
      { fields.includes('country') && (
        <AddressInput
          { ...standardProps }
          error={ error && !string().isValidSync(state.country) }
          key={ `country_${ name }` }
          label='Country'
          name={ `country_${ name }` }
          placeholder='Enter a country'
          value={ state.country }
          onChange={ ({ value: val }) => handleChange({ key: 'country', val }) }
        />
      ) }
    </div>
  );
};

Address.defaultProps = {
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  className: '',
  disabled: false,
  error: false,
  fields: allowedFields,
  fontSize: '1.4rem',
  Input: null,
  margin: '0 0 2rem',
  onChange: () => null,
  padding: '0 1rem',
  required: false,
  size: 'M',
  value: {}
};

Address.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fields: PropTypes.arrayOf(PropTypes.oneOf(allowedFields)),
  fontSize: PropTypes.string,
  Input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  padding: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.object
};

export default Address;