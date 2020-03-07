import Moment from 'moment';
import { get, isEmpty } from 'lodash';

// HELPERS & CONSTANTS
import { buildYup } from '../../helpers/form';

/**
 * EVALUATE FIELD VALUE
 * Evaluate the default value for a field and fallback to correct type if not available
 */
export const evaluateValue = ({ value, type }) => {
  // If not defined grab the default
  if (!value) {
    switch (type) {
      case 'address':
        return {};
      case 'checkbox':
        return false;
      default:
        return '';
    }
  }
  console.log('evaluateValue', {
    value, type
  });
  return value;
};

/**
 * GET INITIAL VALUES
 * Build the initial values from the provided fields and schema
 */
const getInitialValues = (fields, schema, initialData) => {
  return fields.reduce((accum, field) => {
    const value = evaluateValue(field);
    let invalid = false;
    try {
      schema.validateSyncAt(field.name, {
        [field.name]: value
      });
    } catch (error) {
      invalid = error.message;
    }
    return {
      ...accum,
      [field.name]: {
        value: get(initialData, field.name) || field.value || value,
        error: invalid
      }
    };
  }, {});
};

/**
 * BUILD SCHEMA
 * Build the YUP schema from the provided validations
 */
export const buildSchema = (data, initialData) => {
  const builtSchema = buildYup({
    fields: data.form_show.fields
  });
  const initial = getInitialValues(get(data, 'form_show.fields', []), builtSchema, initialData);

  return {
    builtSchema,
    initial
  };
};

/**
 * VALIDATE A SINGLE STEP
 * Validate a step in the form
 */
export const validateStep = ({ step, values }) => {
  const fieldsWithError = get(step, 'fields', []).map(field => {
    // Check for error
    return !!get(values, `${ field.name }.error`, 'hasError');
  })
  // Get rid of false values i.e. field is valid
    .filter(i => i);
  return !(fieldsWithError.length && fieldsWithError.length > 0);
};

/**
 * FORMAT STEPS
 * Format the steps data for the stepper component
 */
export const formatSteps = ({ steps, values }) => {
  return steps.reduce((acc, step) => {
    // Evaluate if previous step is complete or not
    const previousStepComplete = acc.length ? get(acc, `[${ acc.length - 1 }].complete`, false) : true;
    const previousStepDisabled = acc.length ? get(acc, `[${ acc.length - 1 }].disabled`, true) : false;
    return [
      ...acc,
      {
        ...step,
        complete: validateStep({
          step, values
        }),
        disabled: !previousStepComplete && !previousStepDisabled
      }
    ];
  }, []);
};

const evaluateDateValue = (validation) => {
  const els = validation.split(':');
  const format = 'YYYY-MM-DD';
  const currentDate = Moment();
  // Return currentDate if now
  if (els[0] === 'now') {
    return currentDate.format(format);
  }
  // Check we have the right params
  if (els.length === 3) {
    if (els[0] === '-') {
      return currentDate.subtract(els[1], els[2]).format(format);
    }
    if (els[0] === '+') {
      return currentDate.add(els[1], els[2]).format(format);
    }
  }
  // As a fallback allow hardcoded dates
  return Moment(validation);
};

export const findDateValidations = (validations) => {
  const evalValidations = {
    dateRangeMax: null,
    dateRangeMin: null
  };
  if (!isEmpty(validations)) {
    if (validations.max) {
      evalValidations.dateRangeMax = evaluateDateValue(validations.max);
    }
    if (validations.min) {
      evalValidations.dateRangeMin = evaluateDateValue(validations.min);
    }
  }
  return evalValidations;
};