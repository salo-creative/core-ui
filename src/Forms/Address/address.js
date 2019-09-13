import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Input from '../Input';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const allowedFields = ['line1', 'line2', 'city', 'county', 'postcode', 'country'];

const Address = (props) => {
  const {
    fields,
    name,
    required,
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
    console.log(state);
  };

  const handleChange = ({ key, val }) => {
    setState({
      ...state,
      [key]: val
    });
  };

  return (
    <div className='address__wrapper'>
      { fields.includes('line1') && (
        <Input
          key={ `line1_${ name }` }
          label='Address line 1'
          name={ `line1_${ name }` }
          required={ required }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'line1', val }) }
        />
      ) }
      { fields.includes('line2') && (
        <Input
          key={ `line2_${ name }` }
          label='Address line 2'
          name={ `line2_${ name }` }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'line2', val }) }
        />
      ) }
      { fields.includes('city') && (
        <Input
          key={ `city_${ name }` }
          label='City'
          name={ `city_${ name }` }
          required={ required }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'city', val }) }
        />
      ) }
    </div>
  );
};

Address.defaultProps = {
  accept: null,
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  className: '',
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  fields: allowedFields,
  fontSize: '1.4rem',
  helperText: '',
  label: '',
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
  capture: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.oneOf(allowedFields)),
  fontSize: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  padding: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.object
};

export default Address;