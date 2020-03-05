import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { colours } from '../../helpers/colours';

// COMPONENTS & STYLES
import Column from '../../Atoms/Column';
import Row from '../../Atoms/Row';
import Select from '../Select';
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';

import { DatePickerWrapper } from './datePicker.styles';
import Picker from './datePicker.picker';
import SelectDate from './datePicker.selector';

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
  
  handleTimeChange = (type, val) => {
    const { displayFormat, value } = this.props;
    let newDate = moment(value, displayFormat);
    if (type === 'hour') {
      newDate = newDate.hour(val);
    } else {
      newDate = newDate.minute(val);
    }
    
    this.handleChange(newDate);
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
      size,
      timePicker,
      value
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
        className='salo-datepicker'
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
        { timePicker && (
          <Row className='salo-datepicker__time' padding='1rem 0'>
            <Column default={ 6 } padding='0 0.5rem 0 0' className='salo-datepicker__hour-wrapper'>
              <Select
                className='salo-datepicker__select salo-datepicker__select--hour'
                disabled={ !value }
                name={ `${ name }_hour` }
                margins='0'
                onChange={ ({ value: hour }) => this.handleTimeChange('hour', hour) }
                value={ moment(value, displayFormat).format('HH') }
              >
                { !value && <option value=''>Hour</option> }
                <option value='00'>00</option>
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
                <option value='04'>04</option>
                <option value='05'>05</option>
                <option value='06'>06</option>
                <option value='07'>07</option>
                <option value='08'>08</option>
                <option value='09'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <option value='13'>13</option>
                <option value='14'>14</option>
                <option value='15'>15</option>
                <option value='16'>16</option>
                <option value='17'>17</option>
                <option value='18'>18</option>
                <option value='19'>19</option>
                <option value='20'>20</option>
                <option value='21'>21</option>
                <option value='22'>22</option>
                <option value='23'>23</option>
              </Select>
            </Column>
            <Column default={ 6 } padding='0 0 0 0.5rem' className='salo-datepicker__minute-wrapper'>
              <Select
                className='salo-datepicker__select salo-datepicker__select--minute'
                disabled={ !value }
                name={ `${ name }_min` }
                margins='0'
                onChange={ ({ value: min }) => this.handleTimeChange('min', min) }
                value={ moment(value, displayFormat).format('mm') }
              >
                { !value && <option value=''>Minute</option> }
                <option value='00'>00</option>
                <option value='15'>15</option>
                <option value='30'>30</option>
                <option value='45'>45</option>
              </Select>
            </Column>
          </Row>
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
  timePicker: false,
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
  timePicker: PropTypes.bool,
  value: PropTypes.string
};

export default DatePicker;