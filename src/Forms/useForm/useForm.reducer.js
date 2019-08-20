const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.key]: {
          error: action.error,
          value: action.value
        }
      };

    case 'UPDATE_VALUE':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          value: action.value
        }
      };

    case 'DATA_MAPPED':
      return {
        ...state,
        ...action.data,
        mapData: false
      };

    case 'NO_DATA_TO_MAP':
      return {
        ...state,
        mapData: false
      };

    case 'SHOW_ERRORS':
      return {
        ...state,
        showErrors: action.value
      };

    case 'RESET':
      return action.state;

    default:
      return state;
  }
};

export default reducer;