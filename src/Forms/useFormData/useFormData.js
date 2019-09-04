import React from 'react';
import { get } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { buildYup } from 'json-schema-to-yup';

import { GET_FORM, SUBMIT_FORM } from './queries';
import reducer from './reducer';

function getInitialValues(fields, schema) {
  // TODO: Allow values to be passed in.
  return fields.reduce((accum, field) => {
    let invalid = false;
    try {
      schema.validateSyncAt(field.name);
    } catch (error) {
      invalid = error.message;
    }
    return {
      ...accum,
      [field.name]: {
        ...field,
        error: invalid
      }
    };
  }, {});
}

function buildErrorMessages(fields) {
  return fields.reduce((accum, field) => {
    const format = get(field, 'messages.format') || `Please enter ${ field.label } in the correct format`;
    const required = get(field, 'messages.required') || `${ field.label } is required`;
    
    return {
      ...accum,
      [field.name]: {
        format,
        required
      }
    };
  }, {});
}

function buildSchema(data) {
  const schema = JSON.parse(data.form_show.validation);
  const config = { errMessages: buildErrorMessages(data.form_show.fields) };
  const builtSchema = buildYup(schema, config);
  const initial = getInitialValues(get(data, 'form_show.fields', []), builtSchema);

  return {
    builtSchema,
    initial
  };
}

const useFormData = ({ name, initialErrors = false }) => {
  const model = React.useRef({});
  const {
    data,
    loading,
    error
  } = useQuery(GET_FORM, { variables: { name } });

  const [submitForm, {
    data: submitData,
    loading: isSubmitting,
    error: submitError
  }] = useMutation(SUBMIT_FORM);
  
  const [state, dispatch] = React.useReducer(reducer, { showErrors: initialErrors });
  const { showErrors, ...values } = state;

  React.useEffect(() => {
    if (get(data, 'form_show.validation')) {
      const { initial, builtSchema } = buildSchema(data);
      model.current = builtSchema;

      dispatch({
        type: 'UPDATE_FIELDS',
        value: initial
      });
    }
  }, [data]);
  
  // Handle blur events in form
  const handleBlur = (key, value) => {
    // Run the validation
    let invalid = false;
    try {
      model.current.validateSyncAt(key, { [key]: value });
    } catch (err) {
      invalid = err.message;
    }

    // Dispatch update to state
    dispatch({
      type: 'UPDATE_FIELD',
      key,
      error: invalid,
      value
    });
  };

  // Handle change events in form
  const handleChange = (key, value) => {
    console.log('change', { key, value });

    dispatch({
      type: 'UPDATE_VALUE',
      key,
      value
    });
  };

  // Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    const valid = await model.current.isValid(values);
    if (valid) {
      submitForm({
        variables: {
          id: data.form_show.id,
          body: JSON.stringify(values)
        }
      });
    } else {
      dispatch({ type: 'SHOW_ERRORS', value: true });
    }
  };

  const reset = () => {
    console.log('reset');
  };

  const toggleErrors = (value) => {
    dispatch({ type: 'SHOW_ERRORS', value: !!value });
  };

  return {
    error,
    fields: get(data, 'form_show.fields', []),
    handleBlur,
    handleChange,
    handleSubmit,
    loading,
    reset,
    steps: get(data, 'form_show.steps', null),
    submit: {
      data: submitData,
      error: submitError,
      isSubmitting
    },
    toggleErrors,
    values
  };
};

export default useFormData;