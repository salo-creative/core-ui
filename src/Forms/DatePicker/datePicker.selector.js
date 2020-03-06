import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// COMPONENTS & STYLES
import { DateSelectWrapper, SelectWrapper } from './datePicker.styles';

const DateSelect = (props) => {
  const {
    date,
    dateRangeMax,
    dateRangeMin,
    id,
    inputs,
    onChange,
    showDay,
    showMonth,
    showYear
  } = props;

  const { Select } = inputs;

  const maxDate = dateRangeMax ? moment(dateRangeMax) : null;
  const minDate = dateRangeMin ? moment(dateRangeMin) : null;

  const [state, setState] = React.useState({
    dd: date ? date.date().toString().padStart(2, '0') : '',
    mm: date ? (date.month() + 1).toString().padStart(2, '0') : '',
    yyyy: date ? date.year() : ''
  });

  React.useEffect(() => {
    setState({
      dd: date ? date.date().toString().padStart(2, '0') : '',
      mm: date ? (date.month() + 1).toString().padStart(2, '0') : '',
      yyyy: date ? date.year() : ''
    });
  }, [date]);

  const { dd, mm, yyyy } = state;

  const years = () => {
    let max = moment().year();
    let min = moment().subtract(120, 'y').year();
    if (maxDate) {
      max = maxDate.year();
    }
    if (minDate) {
      min = minDate.year();
    }
    return Array.from({
      length: (max - min) + 1
    }, (_, i) => max - i);
  };

  const months = () => {
    const monthNames = moment.monthsShort();
    let numMonths = 12;
    let startMonth = 1;
    // Account for reduced options at limit of range
    if (maxDate && yyyy === maxDate.year().toString()) {
      const maxMonth = maxDate.month();
      numMonths = maxMonth + 1;
    }
    // Account for reduced options at limit of range
    if (minDate && yyyy === minDate.year().toString()) {
      const minMonth = minDate.month();
      numMonths = 12 - minMonth;
      startMonth = minMonth + 1;
    }
    // Account  an array of values
    return Array.from({
      length: numMonths
    }, (_, i) => {
      const value = i + startMonth;
      return {
        value: value.toString().padStart(2, '0'),
        label: monthNames[value - 1]
      };
    });
  };

  const days = () => {
    let numDays = 31;
    let startDay = 1;
    // If a month has been specified, set the number of days based on the currently selected month and year.
    if (mm) {
      numDays = moment(`${ yyyy || 1970 }-${ mm }`, 'YYYY-MM').daysInMonth();
    }
    // Account for reduced options at the limit of range.
    if (minDate && yyyy === minDate.year().toString() && mm === (minDate.month() + 1).toString()) {
      numDays = minDate.daysInMonth() - minDate.date() + 1;
      startDay = minDate.date();
    }
    // Account for reduced options at the limit of range.
    if (maxDate && yyyy === maxDate.year().toString() && mm === (maxDate.month() + 1).toString()) {
      numDays = maxDate.date();
    }
    return Array.from({
      length: numDays
    }, (_, i) => {
      const val = i + startDay;
      return val.toString().padStart(2, '0');
    });
  };

  const handleDateChange = ({ value, field }) => {
    const ns = { // New state
      ...state,
      [field]: value
    };

    // Validation checks on month change if day is set.
    if (ns.dd && field === 'mm') {
      if (moment(`${ yyyy || 1970 }-${ value }`, 'YYYY-MM').daysInMonth() < ns.dd) {
        ns.dd = '';
      }
    }

    // Validation checks on year change if month is set.
    if (!ns.dd && ns.mm && field === 'yyyy') {
      const partialDate = moment(`${ value }-${ ns.mm }`, 'YYYY-MM');
      const partialMin = moment(`${ minDate.year() }-${ minDate.month() }`, 'YYYY-MM');
      const partialMax = moment(`${ maxDate.year() }-${ maxDate.month() }`, 'YYYY-MM');

      if (partialDate.isAfter(partialMax) || partialDate.isBefore(partialMin)) {
        ns.mm = '';
      }
    }

    // If all fields have a value emit change to parent
    if (ns.dd && ns.mm && ns.yyyy) {
      const newDate = moment(`${ ns.dd }/${ ns.mm }/${ ns.yyyy }`, 'DD/MM/YYYY');

      // Validation checks on year change if month and day are set.
      if (field === 'yyyy') {
        if (newDate.isAfter(maxDate) || newDate.isBefore(minDate)) {
          ns.dd = '';
          ns.mm = '';
          setState(ns);
          return;
        }
      }

      // Validation checks on month change if year and day are set.
      if (field === 'mm') {
        if (newDate.isAfter(maxDate) || newDate.isBefore(minDate)) {
          ns.dd = '';
          setState(ns);
          return;
        }
      }
      
      // Final validation check.
      if (!newDate.isValid()) {
        ns.dd = '';
        ns.mm = '';
        ns.yyyy = '';
        return;
      }
      
      onChange(newDate);
    }
    
    setState(ns);
  };

  return (
    <DateSelectWrapper>
      { showDay && (
        <SelectWrapper>
          <Select
            margin='0'
            name={ `dd_${ id }` }
            onChange={ ({ value }) => handleDateChange({
              value, field: 'dd'
            }) }
            value={ dd }
          >
            { !dd && (<option value=''>DD</option>) }
            { days().map(day => (
              <option
                key={ day }
                value={ day }
              >
                { day }
              </option>
            )) }
          </Select>
        </SelectWrapper>
      ) }
      { showMonth && (
        <SelectWrapper>
          <Select
            margin='0'
            name={ `mm_${ id }` }
            onChange={ ({ value }) => handleDateChange({
              value, field: 'mm'
            }) }
            value={ mm }
          >
            { !mm && (<option value=''>MM</option>) }
            { months().map(month => (
              <option
                key={ month.value }
                value={ month.value }
              >
                { month.label }
              </option>
            )) }
          </Select>
        </SelectWrapper>
      ) }
      { showYear && (
        <SelectWrapper>
          <Select
            margin='0'
            name={ `yyyy_${ id }` }
            onChange={ ({ value }) => handleDateChange({
              value, field: 'yyyy'
            }) }
            value={ yyyy }
          >
            { !yyyy && (<option value=''>YYYY</option>) }
            { years().map(year => (
              <option
                key={ year }
                value={ year }
              >
                { year }
              </option>
            )) }
          </Select>
        </SelectWrapper>
      ) }
    </DateSelectWrapper>
  );
};

DateSelect.defaultProps = {
  date: null,
  dateRangeMax: null,
  dateRangeMin: null
};

DateSelect.propTypes = {
  date: PropTypes.object,
  dateRangeMax: PropTypes.string,
  dateRangeMin: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputs: PropTypes.shape({
    Select: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showDay: PropTypes.bool.isRequired,
  showMonth: PropTypes.bool.isRequired,
  showYear: PropTypes.bool.isRequired
};

export default DateSelect;