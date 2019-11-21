import React from 'react';
import { reach } from 'yup';
import { forEach, isEmpty, get } from 'lodash';
import uuid from 'uuid/v4';

// HELPERS & CONSTANTS
import reducer from './useForm.reducer';
import memoizedBuildSchema from './useForm.schema';

const buildSchema = memoizedBuildSchema();

/**
 * useForm
 * name field is required for the key in memoized cache
 * of the schema. If one is not provided it generates a uuid
 *
 * @param {*} model
 * @param {boolean} [initialErrors=false]
 * @param {*} [name=uuid()]
 * @returns
 */
const useForm = ({ model, initialErrors = false, name = uuid(), currentData }) => {
  // Setup state
  const { schema, initial } = buildSchema({
    name, model
  });
  const [state, dispatch] = React.useReducer(reducer, {
    ...initial,
    mapData: true,
    showErrors: initialErrors
  });

  const { showErrors, mapData, ...fields } = state;
  
  React.useEffect(() => {
    if (!mapData) {
      // Run an initial validation
      forEach(model, (_, key) => {
        const value = get(fields, `${ key }.value`);
        reach(schema, key).isValid(value).then(valid => {
          dispatch({
            type: 'UPDATE_FIELD',
            key,
            error: !valid,
            value
          });
        });
      });
    }
  }, [model, mapData, fields, schema]);

  React.useEffect(() => {
    if (mapData && !isEmpty(currentData)) {
      let newData = {};
      forEach(fields, (field, key) => {
        newData = {
          ...newData,
          [key]: {
            ...field,
            value: get(currentData, `${ key }`, field.value)
          }
        };
      });
      dispatch({
        type: 'DATA_MAPPED', data: newData
      });
    } else {
      dispatch({
        type: 'NO_DATA_TO_MAP'
      });
    }
  }, [currentData, fields, mapData]);

  // Flatten data held in state
  const extractDataFromState = () => {
    // Generate a simple key value object from the data in state
    const data = {};
    Object.entries(fields).forEach(([key, value]) => {
      data[key] = value.value;
    });
    return data;
  };

  // Handle blur events in form
  const handleBlur = (key, value) => {
    reach(schema, key).isValid(value).then(valid => {
      dispatch({
        type: 'UPDATE_FIELD',
        key,
        error: !valid,
        value
      });
    });
  };

  // Handle change events in form
  const handleChange = (key, value) => {
    dispatch({
      type: 'UPDATE_VALUE',
      key,
      value
    });
  };

  // Handle submit event
  const handleSubmit = (e, action) => {
    e.preventDefault();
    // Get the data in a format we can run through the validation
    const data = extractDataFromState();
    // Validate the data
    schema.isValid(data).then(valid => {
      if (valid) {
        action(data);
      } else {
        dispatch({
          type: 'SHOW_ERRORS', value: true
        });
      }
    });
  };

  const reset = () => {
    dispatch({
      type: 'RESET',
      state: {
        ...initial, showErrors: initialErrors
      }
    });
    // Run an initial validation
    forEach(model, ({ value }, key) => {
      reach(schema, key).isValid(value).then(valid => {
        dispatch({
          type: 'UPDATE_FIELD',
          key,
          error: !valid,
          value
        });
      });
    });
  };

  const toggleErrors = (value) => {
    dispatch({
      type: 'SHOW_ERRORS', value: !!value
    });
  };

  return {
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
    reset,
    showErrors,
    toggleErrors
  };
};

export default useForm;