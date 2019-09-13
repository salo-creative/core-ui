import { get } from 'lodash';

// HELPERS & CONSTANTS
import { buildYup } from '../../helpers/form';

/**
 * GET INITIAL VALUES
 * Build the initial values from the provided fields and schema
 */
const getInitialValues = (fields, schema) => {
  // TODO: Allow values to be passed in.
  return fields.reduce((accum, field) => {
    let invalid = false;
    try {
      schema.validateSyncAt(field.name, { [field.name]: field.value || '' });
    } catch (error) {
      invalid = error.message;
    }
    return {
      ...accum,
      [field.name]: {
        value: field.value || '',
        error: invalid
      }
    };
  }, {});
};

/**
 * BUILD SCHEMA
 * Build the YUP schema from the provided validations
 */
export const buildSchema = (data) => {
  const builtSchema = buildYup({ fields: data.form_show.fields });
  const initial = getInitialValues(get(data, 'form_show.fields', []), builtSchema);

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
        complete: validateStep({ step, values }),
        disabled: !previousStepComplete && !previousStepDisabled
      }
    ];
  }, []);
};