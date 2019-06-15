# DatePicker

This component is a Single Date Picker based on react-dates from AirBnB. It allows the user to select a date from a calendar pop-up and returns a moment object of that selected date for use in the app. The user can also set a minimum and maximum range for the date picker by giving it a string in DD-MM-YYYY format.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import DatePicker from '@salo/core-ui/Forms/DatePicker';
```

Implement as follows

```javascript
<DatePicker
  onDateChange={date => this.setState({ date })}
  onFocusChange={({focused}) => this.setState({ focused })}
  label="DatePicker Label"
  helperText="Helper Text which appears below the input."
  name="Component's Name"
  dateRangeMin="04-07-1776"
  dateRangeMax="01-05-2025"
/>
```