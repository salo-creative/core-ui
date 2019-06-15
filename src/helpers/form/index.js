import Moment from 'moment';
import DomPurify from 'dompurify';

export const dateRangeValidation = ({ value, max, min }) => {
  const dateObject = Moment(value);
  // Check the dateObject is  valid
  let isValid = dateObject.isValid();
  // If it and we have a max val check it matches
  if (isValid && max) {
    isValid = max.diff(dateObject, 'days') >= 0;
  }
  if (isValid && min) {
    isValid = dateObject.diff(min, 'days') >= 0;
  }
  return isValid;
};

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// General Email Regex (RFC 5322) from https://emailregex.com/
export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
export const postcodeRegExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

export const sanitize = (value) => {
  return DomPurify.sanitize(value);
};