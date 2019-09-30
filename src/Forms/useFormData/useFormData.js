import React from 'react';
import { get, isEmpty, find, findIndex } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';

// HELPERS & CONSTANTS
import { GET_FORM, SUBMIT_FORM } from './useFormData.queries';
import { buildSchema, formatSteps } from './useFormData.helpers';
import reducer from './useFormData.reducer';

const useFormData = ({ 
  initialData,
  name, 
  mutation, 
  mutationName = 'form_submit', 
  initialErrors = false,
  submitAsString = true
}) => {
  const model = React.useRef({});
  const {
    data,
    loading,
    error
  } = useQuery(GET_FORM, { variables: { name } });

  const submitMutation = mutation ? mutation : SUBMIT_FORM(mutationName); // Allow custom mutation to be passed in

  const [submitForm, {
    data: res,
    loading: isSubmitting,
    error: submitError
  }] = useMutation(submitMutation);
  
  const submitData = get(res, mutationName);
  const [state, dispatch] = React.useReducer(reducer, {
    showErrors: initialErrors,
    activeStep: null,
    isDirty: false
  });
  
  const {
    activeStep,
    isDirty,
    showErrors,
    steps,
    values
  } = state;

  React.useEffect(() => {
    if (get(data, 'form_show.fields')) {
      // Build the main schema
      const { initial, builtSchema } = buildSchema(data, initialData);
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
    const formattedData = {};
    const files = [];
    Object.entries(values).forEach(([key, value]) => {
      if (value.value instanceof File) {
        files.push({
          name: key,
          file: value.value
        });
        formattedData[key] = {
          size: value.value.size,
          type: value.value.type
        };
      } else {
        formattedData[key] = value.value;
      }
    });
    return { formattedData, files };
  };
 
  // Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { formattedData, files } = extractDataFromState();
    const valid = await model.current.isValid(formattedData);
    if (valid) {
      submitForm({
        context: { hasUpload: true }, // activate Upload link
        variables: {
          id: data.form_show.id,
          body: submitAsString ? JSON.stringify(formattedData) : formattedData, // Have the option to submit as a string or as an object
          attachments: files
        }
      });
    } else {
      dispatch({ type: 'SHOW_ERRORS', value: true });
    }
  };

  // Handle submit event for stepper
  const handleSubmitStepper = async (e) => {
    e.preventDefault();
    // First check whether we are on the final step and should submit
    const index = findIndex(steps, { id: activeStep });
    if (index + 1 === steps.length) {
      handleSubmit(e);
    } else {
      // we just need to validate the current step and change the page
      const currentStep = find(steps, { id: activeStep });
      if (currentStep.complete) {
      // If step is valid go to the next one
        dispatch({ type: 'CHANGE_STEP', id: get(steps, `[${ index + 1 }].id`) });
      } else {
        // Otherwise throw up the errors
        dispatch({ type: 'SHOW_ERRORS', value: true });
      }
    }
  };

  // Handle step change
  const changeStep = (id) => {
    dispatch({ type: 'CHANGE_STEP', id });
  };

  const toggleErrors = (value) => {
    dispatch({ type: 'SHOW_ERRORS', value: !!value });
  };

  // Handle form reset
  const reset = (value) => {
    dispatch({ type: 'RESET', state: {
      activeStep: 1,
      isDirty: false,
      showErrors: false,
      steps: [],
      values: []
    } });
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
    isDirty,
    loading,
    reset,
    showErrors,
    steps,
    strings: get(data, 'form_show.strings', {}),
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