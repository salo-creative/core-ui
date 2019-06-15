import { object } from 'yup';
import { forEach } from 'lodash';

/**
 * memoizedBuildSchema
 * Dynamically build the schema and starting state
 * @returns
 */
const memoizedBuildSchema = () => {
  const cache = {};
  return ({ name, model }) => {
    // If in cache return immediately
    if (name in cache) {
      return cache[name];
    }
    // Otherwise go ahead and evaluate the schema
    const modelSchema = {};
    const initial = {};
    forEach(model, (item, key) => {
      modelSchema[key] = item.validation;
      initial[key] = {
        error: true,
        value: item.value
      };
    });
    const result = {
      schema: object().shape(modelSchema),
      initial
    };
    // Set to cache and return the value
    cache[name] = result;
    return result;
  };
};

export default memoizedBuildSchema;