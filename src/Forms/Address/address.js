import React from 'react';
import PropTypes from 'prop-types';
import { string } from 'yup';

// COMPONENTS & STYLES
import Input from '../Input';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

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
    value
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

  return (
    <div className={ `address__wrapper ${ className }` }>
      <Input
        { ...standardProps } // eslint-disable-line react/jsx-props-no-spreading
        error={ error && !string().required().isValidSync(state.line1) }
        errorMessage='The first line of address is required'
        key={ `line1_${ name }` }
        label='Address line 1'
        name={ `line1_${ name }` }
        required={ required }
        value={ state.line1 }
        onChange={ ({ value: val }) => handleChange({ key: 'line1', val }) }
      />
      { fields.includes('line2') && (
        <Input
          { ...standardProps } // eslint-disable-line react/jsx-props-no-spreading
          error={ error && !string().isValidSync(state.line2) }
          key={ `line2_${ name }` }
          label='Address line 2'
          name={ `line2_${ name }` }
          value={ state.line2 }
          onChange={ ({ value: val }) => handleChange({ key: 'line2', val }) }
        />
      ) }
      <Input
        { ...standardProps } // eslint-disable-line react/jsx-props-no-spreading
        error={ error && !string().required().isValidSync(state.city) }
        errorMessage='A city is required'
        key={ `city_${ name }` }
        label='City'
        name={ `city_${ name }` }
        required={ required }
        value={ state.city }
        onChange={ ({ value: val }) => handleChange({ key: 'city', val }) }
      />
      { fields.includes('county') && (
        <Input
          { ...standardProps } // eslint-disable-line react/jsx-props-no-spreading
          error={ error && !string().isValidSync(state.county) }
          key={ `county_${ name }` }
          label='County'
          name={ `county_${ name }` }
          value={ state.county }
          onChange={ ({ value: val }) => handleChange({ key: 'county', val }) }
        />
      ) }
      <Input
        { ...standardProps } // eslint-disable-line react/jsx-props-no-spreading
        error={ error && !string().required().isValidSync(state.postcode) }
        errorMessage='A valid postcode is required'
        key={ `postcode_${ name }` }
        label='Postcode'
        name={ `postcode_${ name }` }
        required={ required }
        value={ state.postcode }
        onChange={ ({ value: val }) => handleChange({ key: 'postcode', val }) }
      />
      { fields.includes('country') && (
        <Input
          { ...standardProps } // eslint-disable-line react/jsx-props-no-spreading
          error={ error && !string().isValidSync(state.country) }
          key={ `country_${ name }` }
          label='Country'
          name={ `country_${ name }` }
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
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  padding: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.object
};

export default Address;