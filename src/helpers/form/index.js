import moment from 'moment';
import DomPurify from 'dompurify';
import {
  forEach,
  isEmpty
} from 'lodash';
import {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  ref,
  string
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
 * PASSWORD REGEX
 */
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&£#])[A-Za-z\d@$!%*?&£#]{8,}$/;

/**
 * URL REGEX
 */
export const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-_\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

/**
 * POSTCODE REGEX
 */
// https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
export const postcodeRegExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

/**
 * SANITIZE HTML INPUT
 */
const escapeHTML = str => str.replace(/(&amp;)|(&gt;)|(&lt;)/g,
  match => {
    // If it matches any of these tags they will be replaced
    // by the non-escaped equivalent.
    return {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>'
    }[match] || match;
  });
export const sanitize = (value) => {
  // DOMPurify does a cracking job at purifying for the DOM but in this case for display
  // purposes we can de-escape '&' and chevrons as DOMPurify does the heavylifting for us
  // of escaping bad content.
  return escapeHTML(DomPurify.sanitize(value, {
    USE_PROFILES: {
      html: true
    }
  }));
};

/**
 * BUILD YUP SCHEMA
 * For building yup validation schema from standardised salo form fields
 */
export const buildYup = ({ fields }) => {
  const yupSchema = {};
  forEach(fields, ({ validation, name, meta }) => {
    const {
      type,
      max,
      min,
      required,
      enum: oneOf,
      regex
    } = validation;

    const metadata = meta ? JSON.parse(meta) : {};

    // Rule to build on
    let vRule = mixed();
    // switch on type so we can evaluate validation correctly
    switch (type) {
      case 'string': {
        vRule = string();
        vRule = minMaxInt({
          min, max, vRule
        });
        if (regex) {
          vRule = vRule.matches(new RegExp(regex));
        }
        break;
      }
      case 'password': {
        vRule = string();
        vRule = minMaxInt({
          min, max, vRule
        });
        vRule = vRule.matches(new RegExp(passwordRegex));
        break;
      }
      case 'number': {
        vRule = number();
        vRule = minMaxInt({
          min, max, vRule
        });
        break;
      }
      case 'boolean': {
        vRule = boolean();
        if (required) {
          vRule = vRule.oneOf([true], 'Field must be checked');
        }
        break;
      }
      case 'array':
      case 'arrayOfIds': {
        vRule = array();
        vRule = minMaxInt({
          min, max, vRule
        });
        break;
      }
      case 'date': {
        vRule = date().typeError('Please pick a full date');
        if (min || max) {
          vRule.test(
            'date-in-range', 'The supplied date is not valid',
            (value) => {
              return dateRangeValidation({
                value,
                max: max ? moment(max) : null,
                min: min ? moment(min) : null
              });
            }
          );
        }
        break;
      }
      case 'id': {
        vRule = string().matches(/^[a-f\d]{24}$/i, 'The id supplied is not valid'); // Check is a mongo ObjectID
        break;
      }
      case 'address': {
        vRule = object().shape({
          line1: string().required(),
          line2: string(),
          city: string().required(),
          county: string(),
          country: string(),
          postcode: string().required()
        });
        break;
      }
      case 'email': {
        vRule = string().email();
        vRule = minMaxInt({
          min, max, vRule
        });
        break;
      }
      case 'tel': {
        vRule = string().matches(phoneRegExp, 'The number supplied is not in an accepted format');
        break;
      }
      case 'url': {
        vRule = string().matches(urlRegex, 'The url supplied is not in an accepted format');
        vRule = minMaxInt({
          min, max, vRule
        });
        break;
      }
      case 'file': {
        // Check file type
        if (!isEmpty(oneOf)) {
          // get the mime types
          const acceptedTypes = getMimeTypes(oneOf);
          vRule = vRule.test('fileType', 'Unsupported file type', value => {
            // If we don't have a value and the field isn't required then pass test.
            if (!value && !required) {
              return true;
            }
            if (value instanceof FileList) {
              // Ensure all of the files are valid.
              return !!Array.from(value).filter((file) => {
                return acceptedTypes.includes(file.type);
              }).length;
            }
            if (value) {
              return acceptedTypes.includes(value.type);
            }
            return false;
          });
        }
        // check file size
        if (max) {
          vRule = vRule.test('fileSize', 'File size is too large', value => {
            // If we don't have a value and the field isn't required then pass test.
            if (!value && !required) {
              return true;
            }
            const MAX_FILE_SIZE = parseInt(max, 10);
            if (value instanceof FileList) {
              // Ensure all of the files are valid.
              return !!Array.from(value).filter((file) => {
                return file.size <= MAX_FILE_SIZE;
              }).length;
            }
            if (value) {
              return value && value.size <= MAX_FILE_SIZE;
            }
            return false;
          });
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
    if (type !== 'file' && !isEmpty(oneOf)) {
      vRule = vRule.oneOf(oneOf);
    }
    // MATCHES
    if (metadata && metadata.match) {
      vRule = string().oneOf([ref(metadata.match), null], `Field must match ${ metadata.match }`);
    }

    // assign rules to schema
    yupSchema[name] = vRule;
  });
  return object().shape(yupSchema);
};