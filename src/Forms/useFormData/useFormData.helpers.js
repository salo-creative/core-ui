import { get } from 'lodash';
import { buildYup } from 'json-schema-to-yup';

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
 * BUILD ERROR MESSAGES
 * Build the error message objects for use in the YUP validation
 */
const buildErrorMessages = (fields) => {
  return fields.reduce((accum, field) => {
    const format = get(field, 'messages.format') || `Please enter ${ field.label } in the correct format`;
    const required = get(field, 'messages.required') || `${ field.label } is required`;
    
    return {
      ...accum,
      [field.name]: {
        format,
        regex: format,
        pattern: format,
        required
      }
    };
  }, {});
};

/**
 * BUILD SCHEMA
 * Build the YUP schema from the provided validations
 */
export const buildSchema = (data) => {
  const schema = JSON.parse(data.form_show.validation);
  const config = { errMessages: buildErrorMessages(data.form_show.fields) };
  const builtSchema = buildYup(schema, config);
  const initial = getInitialValues(get(data, 'form_show.fields', []), builtSchema);

  return {
    builtSchema,
    initial
  };
};