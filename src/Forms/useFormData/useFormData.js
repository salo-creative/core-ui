import React from 'react';
import { get } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';

// HELPERS & CONSTANTS
import { GET_FORM, SUBMIT_FORM } from './useFormData.queries';
import { buildSchema } from './useFormData.helpers';
import reducer from './useFormData.reducer';

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
  const handleBlur = ({ key, value }) => {
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
  const handleChange = ({ key, value }) => {
    dispatch({
      type: 'UPDATE_VALUE',
      key,
      value
    });
  };

  // Flatten data held in state
  const extractDataFromState = () => {
    // Generate a simple key value object from the data in state
    const formattedDate = {};
    Object.entries(values).forEach(([key, value]) => {
      formattedDate[key] = value.value;
    });
    return formattedDate;
  };

  // Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = extractDataFromState();
    const valid = await model.current.isValid(formattedData);
    if (valid) {
      submitForm({
        variables: {
          id: data.form_show.id,
          body: JSON.stringify(formattedData)
        }
      });
    } else {
      dispatch({ type: 'SHOW_ERRORS', value: true });
    }
  };

  // const reset = () => {
  //   console.log('reset');
  // };

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
    // reset,
    showErrors,
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