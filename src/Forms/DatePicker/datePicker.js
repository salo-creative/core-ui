import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// COMPONENTS & STYLES
import { DatePickerWrapper } from './datePicker.styles';
import Picker from './datePicker.picker';
import SelectDate from './datePicker.selector';
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';

import { colours } from '../../helpers/colours';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    const { value, ioFormat } = props;
    let date = null;
    // If we have an input date check it is valid and map to state
    if (value) {
      const inputDate = moment(value, ioFormat);
      if (inputDate.isValid()) {
        date = inputDate;
      }
    }
    this.state = {
      value, date
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Map changed date to moment in state
    const { value, ioFormat } = nextProps;
    if (value !== prevState.value) {
      const inputDate = moment(value, ioFormat);
      if (inputDate.isValid()) {
        return {
          value, date: inputDate
        };
      }
      return {
        value, date: null
      };
    }
    return null;
  }

  handleChange = (newDate) => {
    const { onChange, ioFormat } = this.props;
    if (newDate && newDate.isValid()) {
      onChange(newDate.format(ioFormat));
    } else {
      onChange(null);
    }
  }

  render() {
    const {
      asSelect,
      background,
      border,
      borderRadius,
      dateRangeMax,
      dateRangeMin,
      disabled,
      displayFormat,
      error,
      errorMessage,
      helperText,
      label,
      margin,
      name,
      placeholder,
      required,
      size
    } = this.props;

    const { date } = this.state;

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
      <DatePickerWrapper
        margin={ margin }
        height={ height() }
        background={ background }
        border={ border }
        borderRadius={ borderRadius }
      >
        <Label
          error={ error }
          label={ label }
          name={ name }
          required={ required }
          size={ size }
        />
        { asSelect && (
          <SelectDate
            date={ date }
            dateRangeMax={ dateRangeMax }
            dateRangeMin={ dateRangeMin }
            id={ name }
            onChange={ this.handleChange }
          />
        ) }
        { !asSelect && (
          <Picker
            date={ date }
            dateRangeMax={ dateRangeMax }
            dateRangeMin={ dateRangeMin }
            displayFormat={ displayFormat }
            id={ name }
            onChange={ this.handleChange }
            placeholder={ placeholder }
          />
        ) }
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
      </DatePickerWrapper>
    );
  }
}

DatePicker.defaultProps = {
  asSelect: false,
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  dateRangeMax: null,
  dateRangeMin: null,
  disabled: false,
  displayFormat: 'DD/MM/YYYY',
  error: false,
  errorMessage: 'Field invalid',
  ioFormat: 'DD/MM/YYYY',
  label: '',
  helperText: '',
  margin: '0 0 2rem',
  onChange: () => null,
  placeholder: 'Please enter a date...',
  required: false,
  size: 'M',
  value: ''
};

DatePicker.propTypes = {
  asSelect: PropTypes.bool,
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  dateRangeMax: PropTypes.string,
  dateRangeMin: PropTypes.string,
  disabled: PropTypes.bool,
  displayFormat: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  ioFormat: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.string
};

export default DatePicker;