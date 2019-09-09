import React from 'react';
import { get, isEmpty } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';

// HELPERS & CONSTANTS
import { GET_FORM, SUBMIT_FORM } from './useFormData.queries';
import { buildSchema, formatSteps } from './useFormData.helpers';
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
  
  const [state, dispatch] = React.useReducer(reducer, {
    showErrors: initialErrors,
    activeStep: null
  });
  
  const {
    activeStep,
    showErrors,
    steps,
    values
  } = state;

  React.useEffect(() => {
    if (get(data, 'form_show.validation')) {
      // Build the main schema
      const { initial, builtSchema } = buildSchema(data);
      model.current = builtSchema;

      let processedSteps;
      // Now process steps if they exist
      const stepsData = get(data, 'form_show.steps');
      if (!isEmpty(stepsData)) {
        // Map over steps and validate
        processedSteps = formatSteps({ steps: stepsData, values: initial });
      }

      dispatch({
        type: 'UPDATE_FIELDS',
        values: initial,
        activeStep: get(data, 'form_show.steps[0].id', null),
        steps: processedSteps
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

    // If we are using a stepper process the steps
    if (activeStep) {
      // New values object for step validation
      const newValues = {
        ...values,
        [key]: {
          error: invalid,
          value
        }
      };

      const processedSteps = formatSteps({
        steps: get(data, 'form_show.steps'),
        values: newValues
      });
      // Dispatch update to state
      dispatch({
        type: 'UPDATE_FIELDS',
        values: newValues,
        activeStep,
        steps: processedSteps
      });
    } else {
      // Otherwise just update as normal
      dispatch({
        type: 'UPDATE_FIELD',
        key,
        error: invalid,
        value
      });
    }
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

  // Handle submit event for stepper
  const handleSubmitStepper = async (e) => {
    e.preventDefault();
    console.log('stepper');
    // const formattedData = extractDataFromState();
    // const valid = await model.current.isValid(formattedData);
    // if (valid) {
    //   submitForm({
    //     variables: {
    //       id: data.form_show.id,
    //       body: JSON.stringify(formattedData)
    //     }
    //   });
    // } else {
    //   dispatch({ type: 'SHOW_ERRORS', value: true });
    // }
  };

  // Handle step change
  const changeStep = (id) => {
    dispatch({ type: 'CHANGE_STEP', id });
  };

  // const reset = () => {
  //   console.log('reset');
  // };

  const toggleErrors = (value) => {
    dispatch({ type: 'SHOW_ERRORS', value: !!value });
  };

  return {
    activeStep,
    changeStep,
    error,
    fields: get(data, 'form_show.fields', []),
    handleBlur,
    handleChange,
    handleSubmit,
    handleSubmitStepper,
    loading,
    // reset,
    showErrors,
    steps,
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