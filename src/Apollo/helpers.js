import {
  get, hasIn, forEach, isEmpty, find
} from 'lodash';

import { ENV } from '../helpers/environments';

export const GraphQLUrl = (local = false, port = 7000) => {
  if (local && ENV === 'development') {
    return `http://localhost:${ port }/graphql`;
  }
  return webpackVars.GRAPHLQL_URL;
};

export const isLoading = ({ networkStatus, skip = false }) => !skip && (
  // Initial load
  (networkStatus === 1)
  // Reload due to variables change
  || (networkStatus === 2)
  // Reload due to refetch
  || (networkStatus === 4)
);

export const isError = ({ networkStatus, error, skip = false }) => (
  error || (!skip && (networkStatus === 8)) // Network error (exclude skip as that also causes status of 8)
);

export const getRequestStatus = ({ networkStatus, error, skip = false }) => {
  return {
    requestLoading: isLoading({
      networkStatus, skip
    }),
    requestError: isError({
      networkStatus, error, skip
    })
  };
};

export const parseApolloError = ({ error, propName = 'APOLLO_ERROR' }) => {
  let code = 400;
  let message = 'Something went wrong!';
  const errors = [];
  const extra = {};
  let name = propName; // For custom sentry logging
  if (error.graphQLErrors) {
    // Find custom errors if they exist
    const customError = find(error.graphQLErrors, {
      message: 'SC_ERROR'
    });

    if (hasIn(customError, 'path')) {
      extra.path = customError.path.join(' -> ');
      name = propName === 'APOLLO_ERROR' ? `APOLLO_ERROR: ${ customError.path[0] }` : propName;
    }

    code = get(customError, 'extensions.status', code);

    // Handle custom error message
    const serverMessage = get(customError, 'extensions.message');
    if (serverMessage && typeof serverMessage === 'string') {
      message = serverMessage;
    } else if (typeof serverMessage === 'object') {
      message = serverMessage.message; // eslint-disable-line
      code = serverMessage.name === 'ValidationError' ? 422 : 400;
    }

    // Handle custom errors array
    const serverErrorsMessages = get(customError, 'extensions.errors');
    if (!isEmpty(serverErrorsMessages)) {
      forEach(serverErrorsMessages, errMessage => {
        if (typeof errMessage === 'string') {
          errors.push(errMessage);
        } else if (get(errMessage, 'message')) { // handle new nested errors
          errors.push(get(errMessage, 'message')
          // Format default Mongoose errors for failed fields
            .replace('Path `', 'The field `') // Required & general errors
            .replace('Validator failed for path `', 'Validation failed for `')); // Custom validators
        }
      });
    }
  }

  return {
    code,
    errors,
    extra,
    message,
    name
  };
};