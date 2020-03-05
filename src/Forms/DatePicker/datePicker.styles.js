import styled from 'styled-components';
import { transparentize, darken, lighten } from 'polished';

import base from './datePicker.styles.base';

export const DatePickerWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  margin: ${ ({ margin }) => margin };

  ${ base }

  /* You will find the style overrides for the datepicker below.
     Many of the default hex colors have been replaced with theme references.
     The Input styles have been adjusted to fit with the other elements in the UI library.
  */
  .SingleDatePickerInput {
    width: 100%;
    display: inline-block;
    background: none;
  }
  .SingleDatePickerInput__withBorder {
    border: none;
  }
  .SingleDatePickerInput_calendarIcon_svg {
    fill: ${ ({ theme }) => theme.darkGrey };
  }
  .SingleDatePicker_picker {
    background-color: ${ ({ theme }) => theme.paleGrey };
    z-index: 3; /* Place above time pickers */
  }
  .CalendarDay__default {
    border: 1px solid ${ ({ theme }) => theme.paleGrey };
    color: ${ ({ theme }) => theme.font };
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarDay__default:hover {
    background: ${ ({ theme }) => darken(0.2, theme.primary) };
  }
  .CalendarDay__outside {
    border: 0;
    background: ${ ({ theme }) => theme.paleGrey };
    color: ${ ({ theme }) => theme.font };
  }
  .CalendarDay__blocked_minimum_nights {
    background: ${ ({ theme }) => theme.paleGrey };
    color: ${ ({ theme }) => theme.darkGrey };
  }
  .CalendarDay__blocked_minimum_nights:active,
  .CalendarDay__blocked_minimum_nights:hover {
    background: ${ ({ theme }) => theme.paleGrey };
    color: ${ ({ theme }) => theme.darkGrey };
  }
  .CalendarDay__highlighted_calendar {
    background: #ffe8bc;
    color: ${ ({ theme }) => theme.font };
  }
  .CalendarDay__highlighted_calendar:active,
  .CalendarDay__highlighted_calendar:hover {
    background: #ffce71;
    color: ${ ({ theme }) => theme.font };
  }
  .CalendarDay__selected_span {
    color: ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    background: ${ ({ theme }) => theme.primary };
    color: ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${ ({ theme }) => theme.primary };
    color: ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: ${ ({ theme }) => darken(0.2, theme.primary) };
    color: ${ ({ theme }) => theme.darkGrey };
  }
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: ${ ({ theme }) => theme.paleGrey };
    color: ${ ({ theme }) => transparentize(0.5, theme.darkGrey) };
    border: 1px solid ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarDay__hovered_start_first_possible_end {
    background: ${ ({ theme }) => theme.paleGrey };
    border: 1px double ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarDay__hovered_start_blocked_min_nights {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarMonth {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .CalendarMonth_caption {
    color: ${ ({ theme }) => theme.font };
    font-size: 18px;
    text-align: center;
    padding-top: 18px;
    padding-bottom: 37px;
    caption-side: initial;
    /* Month/Year Selection Styling */
    & select {
      height: 33px;
      border-radius: 3px;
      background: #fff;
      color: ${ ({ theme }) => theme.font };
      font-size: inherit;
      padding: 0 1rem 0 1rem;
      margin: 0 .5rem 0 .5rem;
      border: 1px solid ${ ({ theme }) => transparentize(0.5, theme.primary) };
      appearance: none;
      & :hover {
        border: 1px solid ${ ({ theme }) => darken(0.2, theme.primary) };
      }
    }
  }
  .CalendarMonthGrid {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DayPickerNavigation_button__default {
    border: 1px solid ${ ({ theme }) => transparentize(0.5, theme.primary) };
    background-color: #fff;
    color: #757575;
  }
  .DayPickerNavigation_button__default:focus,
  .DayPickerNavigation_button__default:hover {
    border: 1px solid ${ ({ theme }) => darken(0.2, theme.primary) };
  }
  .DayPickerNavigation_button__default:active {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DayPickerNavigation_button__disabled {
    cursor: default;
    border: 1px solid ${ ({ theme }) => theme.paleGrey };
  }
  .DayPickerNavigation_button__disabled:focus,
  .DayPickerNavigation_button__disabled:hover {
    border: 1px solid ${ ({ theme }) => darken(0.2, theme.primary) };
  }
  .DayPickerNavigation_button__verticalDefault {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DayPickerNavigation_svg__horizontal {
    fill: ${ ({ theme }) => theme.darkGrey };
  }
  .DayPickerNavigation_svg__vertical {
    fill: ${ ({ theme }) => theme.font };
  }
  .DayPickerNavigation_svg__disabled {
    fill: ${ ({ theme }) => theme.paleGrey };
  }
  .DayPicker {
    background: ${ ({ theme }) => theme.paleGrey };
    position: relative;
    text-align: left;
  }
  .DayPicker__horizontal {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DayPicker__withBorder {
    box-shadow: 0 3px 6px rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.07);
    border-radius: 3px;
  }
  .DayPicker_weekHeader__verticalScrollable {
    border-bottom: 1px solid ${ ({ theme }) => transparentize(0.50, theme.darkGrey) };
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DateInput {
    margin: 0;
    padding: 0;
    background: none;
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: middle;
  }
  .DateInput__disabled {
    background: ${ ({ theme }) => theme.paleGrey };
    color: ${ ({ theme }) => transparentize(0.50, theme.darkGrey) };
  }
  .DateInput_input {
    font-weight: 200;
    font-size: 1.4rem;
    height: ${ ({ height }) => height };
    color: ${ ({ theme }) => theme.font };
    background-color: ${ ({ theme }) => theme.paleGrey };
    width: 100%;
    margin: 0;
    padding: ${ ({ padding }) => padding };
    height: ${ ({ height }) => height };
    background-color: ${ ({ background, error, theme }) => (error ? transparentize(0.7, theme.error) : background) };
    border: ${ ({ border }) => border };
    border-color: ${ ({ theme, error }) => (error ? transparentize(0.3, theme.error) : transparentize(0.5, theme.primary)) };
    transition: border 0.2s linear;
    width: 100%;
    border-radius: ${ ({ borderRadius }) => borderRadius };
    font-size: ${ ({ fontSize }) => fontSize };

    &:focus,
    &:active {
      border-color: ${ ({ theme }) => theme.primary }
    }

    &[disabled] {
      cursor:  not-allowed;
      opacity: 0.75;
    }
  }
  .DateInput_input__focused {
    outline: 0;
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DateInput_input__disabled {
    background: ${ ({ theme }) => theme.paleGrey };
    font-style: italic;
  }
  .DateInput_fangShape {
    fill: ${ ({ theme }) => theme.paleGrey };
  }
  .DateInput_fangStroke {
    stroke: ${ ({ theme }) => transparentize(0.50, theme.darkGrey) };
    fill: transparent;
  }
  .DateRangePickerInput {
    background-color: ${ ({ theme }) => theme.paleGrey };
    display: inline-block;
  }
  .DateRangePickerInput__disabled {
    background: ${ ({ theme }) => theme.paleGrey };
  }
  .DateRangePickerInput__withBorder {
    border-radius: 3px;
    border: 1px solid ${ ({ theme }) => transparentize(0.50, theme.darkGrey) };
  }
  .DateRangePickerInput_arrow {
    display: inline-block;
    vertical-align: middle;
    color: ${ ({ theme }) => theme.font };
  }
  .DateRangePickerInput_arrow_svg {
    vertical-align: middle;
    fill: ${ ({ theme }) => theme.font };
  }
  .DateRangePickerInput_clearDates_default:focus,
  .DateRangePickerInput_clearDates_default:hover {
    background: ${ ({ theme }) => transparentize(0.50, theme.darkGrey) };
  }
  .DateRangePickerInput_clearDates_svg {
    fill: ${ ({ theme }) => theme.darkGrey };
  }
  .DateRangePickerInput_calendarIcon_svg {
    fill: ${ ({ theme }) => theme.darkGrey };
  }
  .DateRangePicker_picker {
    background-color: ${ ({ theme }) => theme.paleGrey };
  }
  .DateRangePicker_picker__fullScreenPortal {
    background-color: ${ ({ theme }) => theme.paleGrey };
  }
  .DateRangePicker_closeButton:focus,
  .DateRangePicker_closeButton:hover {
    color: darken(${ ({ theme }) => theme.darkGrey },10%);
  }
  .DateRangePicker_closeButton_svg {
    fill: ${ ({ theme }) => theme.darkGrey };
  }

`;

// Select picker
export const DateSelectWrapper = styled.div`
  display: flex;
  width: calc(100% + 2rem);
  margin: 0 -1rem;
  max-width: 40rem;
`;

export const SelectWrapper = styled.div`
  margin: 0;
  display: flex;
  padding: 0 1rem;
  width: 33.3333%;
`;