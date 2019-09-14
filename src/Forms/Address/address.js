import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Input from '../Input';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const allowedFields = ['line1', 'line2', 'city', 'county', 'postcode', 'country'];

const Address = (props) => {
  const {
    background,
    border,
    borderRadius,
    className,
    disabled,
    error,
    fields,
    name,
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
    console.log(state);
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

  return (
    <div className={ `address__wrapper ${ className }` }>
      { fields.includes('line1') && (
        <Input
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          disabled={ disabled }
          key={ `line1_${ name }` }
          label='Address line 1'
          name={ `line1_${ name }` }
          padding={ padding }
          required={ required }
          size={ size }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'line1', val }) }
          onBlur={ handleBlur }
          onKeyUp={ handleKeyUp }
        />
      ) }
      { fields.includes('line2') && (
        <Input
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          disabled={ disabled }
          key={ `line2_${ name }` }
          label='Address line 2'
          name={ `line2_${ name }` }
          padding={ padding }
          size={ size }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'line2', val }) }
          onBlur={ handleBlur }
          onKeyUp={ handleKeyUp }
        />
      ) }
      { fields.includes('city') && (
        <Input
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          disabled={ disabled }
          key={ `city_${ name }` }
          label='City'
          name={ `city_${ name }` }
          padding={ padding }
          required={ required }
          size={ size }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'city', val }) }
          onBlur={ handleBlur }
          onKeyUp={ handleKeyUp }
        />
      ) }
      { fields.includes('county') && (
        <Input
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          disabled={ disabled }
          key={ `county_${ name }` }
          label='County'
          name={ `county_${ name }` }
          padding={ padding }
          size={ size }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'county', val }) }
          onBlur={ handleBlur }
          onKeyUp={ handleKeyUp }
        />
      ) }
      { fields.includes('postcode') && (
        <Input
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          disabled={ disabled }
          key={ `postcode_${ name }` }
          label='Postcode'
          name={ `postcode_${ name }` }
          padding={ padding }
          required={ required }
          size={ size }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'postcode', val }) }
          onBlur={ handleBlur }
          onKeyUp={ handleKeyUp }
        />
      ) }
      { fields.includes('country') && (
        <Input
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          disabled={ disabled }
          key={ `country_${ name }` }
          label='Country'
          name={ `country_${ name }` }
          padding={ padding }
          size={ size }
          value={ state.line1 }
          onChange={ ({ value: val }) => handleChange({ key: 'country', val }) }
          onBlur={ handleBlur }
          onKeyUp={ handleKeyUp }
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
  errorMessage: 'Field invalid',
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
  errorMessage: PropTypes.string,
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