import React from 'react';
import {
  get, isEmpty, find, findIndex, hasIn
} from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';

// HELPERS & CONSTANTS
import { GET_FORM, SUBMIT_FORM } from './useFormData.queries';
import { buildSchema, formatSteps } from './useFormData.helpers';
import reducer from './useFormData.reducer';

const useFormData = ({
  name,
  options,
  onSubmit,
  saving,
  initialData,
  initialErrors = false
}) => {
  // * Refs
  const model = React.useRef({});

  // * Reducer
  const [state, dispatch] = React.useReducer(reducer, {
    showErrors: initialErrors,
    activeStep: null,
    isDirty: false
  });

  // * Custom hooks
  // Get the form by name.
  const {
    data,
    loading,
    error
  } = useQuery(GET_FORM, {
    variables: {
      name
    }
  });
  
  const {
    activeStep,
    isDirty,
    showErrors,
    steps,
    values
  } = state;

  // Update schema when fields are fetched from server.
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
        processedSteps = formatSteps({
          steps: stepsData, values: initial
        });
      }
      
      dispatch({
        type: 'UPDATE_FIELDS',
        values: initial,
        activeStep: get(data, 'form_show.steps[0].id', null),
        steps: processedSteps
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // Ignore initial data to prevent re-evaluation when server fetched data is being updated
  
  // Handle blur events in form
  const handleBlur = ({ key, value }) => {
    // Run the validation
    let invalid = false;
    try {
      model.current.validateSyncAt(key, {
        [key]: value
      });
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
      if (value.value instanceof Blob || value.value instanceof File) {
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
    return {
      formattedData, files
    };
  };

  // Handle form reset
  const reset = () => {
    dispatch({
      type: 'RESET',
      state: {
        activeStep: !isEmpty(steps) ? steps[0].id : null,
        steps,
        isDirty: false,
        showErrors: false,
        values: {}
      }
    });
  };
 
  // Setup submit mutation.
  const [submitForm, {
    data: res,
    loading: isSubmitting,
    error: submitError
  }] = useMutation(SUBMIT_FORM, {
    onCompleted: () => {
      if (options.resetFormPostSubmit) {
        reset();
      }
    }
  });

  // Handle submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { formattedData, files } = extractDataFromState();
    const valid = await model.current.isValid(formattedData);

    if (valid) {
      try {
        if (typeof onSubmit === 'function') {
          onSubmit({
            data: formattedData,
            files,
            resetForm: reset
          });
        } else {
          await submitForm({
            context: {
              hasUpload: true // activate Upload link
            },
            variables: {
              id: data.form_show.id,
              body: JSON.stringify(formattedData),
              attachments: files
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({
        type: 'SHOW_ERRORS',
        value: true
      });
    }
  };

  // Handle submit event for stepper
  const handleSubmitStepper = async (event, formRef) => {
    event.preventDefault();
    // First check whether we are on the final step and should submit
    const index = findIndex(steps, {
      id: activeStep
    });
    if (index + 1 === steps.length) {
      handleSubmit(event);
    } else {
      // We only need to validate the current step and change the page
      const currentStep = find(steps, {
        id: activeStep
      });
      if (currentStep.complete) {
        // If step is valid go to the next one
        dispatch({
          type: 'CHANGE_STEP', id: get(steps, `[${ index + 1 }].id`)
        });
        // Scroll form to top when page changes.
        if (hasIn(formRef, 'current.scrollIntoView')) {
          setTimeout(() => {
            formRef.current.scrollIntoView();
          }, 1);
        }
      } else {
        // Otherwise throw up the errors
        dispatch({
          type: 'SHOW_ERRORS', value: true
        });
      }
    }
  };

  // Handle step change
  const changeStep = (id) => {
    dispatch({
      type: 'CHANGE_STEP', id
    });
  };

  const toggleErrors = (value) => {
    dispatch({
      type: 'SHOW_ERRORS', value: !!value
    });
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
      data: get(res, 'form_submit'),
      error: submitError,
      isSubmitting: typeof onSubmit === 'function' ? saving : isSubmitting
    },
    toggleErrors,
    values
  };
};

export default useFormData;