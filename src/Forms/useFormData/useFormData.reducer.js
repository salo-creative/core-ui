const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.key]: {
            error: action.error,
            value: action.value
          }
        }
      };

    case 'UPDATE_FIELDS':
      return {
        ...state,
        values: { ...action.value }
      };

    case 'UPDATE_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.key]: {
            ...state[action.key],
            value: action.value
          }
        }
      };

    case 'SHOW_ERRORS':
      return {
        ...state,
        showErrors: action.value
      };

    case 'RESET':
      return action.state;

    case 'CHANGE_STEP':
      return {
        ...state,
        activeStep: action.id
      };

    default:
      return state;
  }
};

export default reducer;