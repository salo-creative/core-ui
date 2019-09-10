import moment from 'moment';
import DomPurify from 'dompurify';
import {
  forEach,
  isEmpty
} from 'lodash';
import {
  string,
  object,
  number,
  mixed,
  date,
  boolean,
  array
} from 'yup';

// HELPERS & CONSTANTS
import { mimeTypes } from '../../Forms/Upload';

/**
 * GET MIME TYPES
 * Evaluate mime types for file uploads
 */
const getMimeTypes = (groups = ['documents']) => {
  let types = [];
  forEach(mimeTypes, (value, key) => {
    if (groups.includes(key)) {
      types = [...types, ...value];
    }
  });
  return types;
};

/**
 * MIN MAX INTEGER
 * Evaluate min max rules where an integer is required
 */
const minMaxInt = ({ min, max, vRule }) => {
  let rule = vRule;
  if (max) {
    rule = rule.max(parseInt(max, 10));
  }
  if (min) {
    rule = rule.min(parseInt(min, 10));
  }

  return rule;
};

/**
 * VALIDATE DATE RANGE
 * Check date is within accepted range
 */
export const dateRangeValidation = ({ value, max, min }) => {
  const dateObject = moment(value);
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

/**
 * PHONE REGEX
 */
export const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

/**
 * POSTCODE REGEX
 */
// https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
export const postcodeRegExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

/**
 * SANITIZE HTML INPUT
 */
export const sanitize = (value) => {
  return DomPurify.sanitize(value);
};


/**
 * BUILD YUP SCHEMA
 * For building yup validation schema from stadardised salo form fields
 */
export const buildYup = ({ fields }) => {
  const yupSchema = {};
  forEach(fields, ({ validation, name }) => {
    const {
      type,
      max,
      min,
      required,
      enum: oneOf,
      regex
    } = validation;

    // Rule to build on
    let vRule = mixed();
    // switch on type so we can evaluate validation correctly
    switch (type) {
      case 'string': {
        vRule = string();
        vRule = minMaxInt({ min, max, vRule });
        if (regex) {
          vRule = vRule.matches(new RegExp(regex));
        }
        break;
      }
      case 'number': {
        vRule = number();
        vRule = minMaxInt({ min, max, vRule });
        break;
      }
      case 'boolean': {
        vRule = boolean();
        break;
      }
      case 'array':
      case 'arrayOfIds': {
        vRule = array();
        vRule = minMaxInt({ min, max, vRule });
        break;
      }
      case 'date': {
        break;
      }
      case 'id': {
        vRule = string().matches(/^[a-f\d]{24}$/i, 'The id supplied is not valid'); // Check is a mongo ObjectID
        break;
      }
      case 'address': {
        break;
      }
      case 'email': {
        vRule = string().email();
        vRule = minMaxInt({ min, max, vRule });
        break;
      }
      case 'tel': {
        vRule = string().matches(phoneRegExp, 'The number supplied is not in an accepted format');
        break;
      }
      case 'url': {
        vRule = string().url();
        vRule = minMaxInt({ min, max, vRule });
        break;
      }
      case 'file': {
        // Check file type
        if (!isEmpty(oneOf)) {
          // get the mime types
          const acceptedTypes = getMimeTypes(oneOf);
          vRule = vRule.test('fileType', 'Unsupported file type', value => value && acceptedTypes.includes(value.type));
        }
        // check file size
        if (max) {
          vRule = vRule.test('fileSize', 'File size is too large', value => value && value.size <= parseInt(max, 10));
        }
        break;
      }
      default:
        break;
    }

    // Set type agnostic fields
    // REQUIRED
    if (required && type !== 'boolean') {
      vRule = vRule.required();
    }
    // ENUM
    if (!isEmpty(oneOf)) {
      vRule = vRule.oneOf(oneOf);
    }
    // assign rules to schema
    yupSchema[name] = vRule;
  });
  return object().shape(yupSchema);
};