import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

const Picker = (props) => {
  const {
    date,
    dateRangeMax,
    dateRangeMin,
    displayFormat,
    id,
    onChange,
    placeholder
  } = props;

  const [focus, setFocus] = React.useState(false);

  // This function checks any given day against the dateRangeMin and dateRangeMax passed to the component.
  const dateRange = (day) => {
    let outside = false;
    if (dateRangeMin) {
      outside = day.isBefore(dateRangeMin);
    }
    if (!outside && dateRangeMax) {
      outside = day.isAfter(dateRangeMax);
    }
    return outside;
  };

  const evaluateInitialMonth = () => {
    // If we have a maxDate and its in the past set current month to max
    if (dateRangeMax) {
      const max = moment(dateRangeMax);
      if (!max.isAfter(moment())) {
        return max;
      }
    }

    // If we have a minimum date and its in the future set current date to this
    if (dateRangeMin) {
      const min = moment(dateRangeMin);
      if (min.isAfter(moment())) {
        return min;
      }
    }
    return moment();
  };

  return (
    <SingleDatePicker
      date={ date }
      displayFormat={ displayFormat }
      focused={ focus }
      firstDayOfWeek={ 1 }
      hideKeyboardShortcutsPanel
      id={ id }
      isOutsideRange={ dateRange }
      numberOfMonths={ 1 }
      onDateChange={ onChange }
      onFocusChange={ ({ focused }) => setFocus(focused) }
      placeholder={ placeholder }
      initialVisibleMonth={ evaluateInitialMonth }
    />
  );
};

Picker.defaultProps = {
  date: null,
  dateRangeMax: null,
  dateRangeMin: null
};

Picker.propTypes = {
  date: PropTypes.object,
  dateRangeMax: PropTypes.string,
  dateRangeMin: PropTypes.string,
  displayFormat: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default Picker;