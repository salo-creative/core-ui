import { findIndex } from 'lodash';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return [
        ...state,
        action.alert
      ];

    case 'DELETE_ALERT': {
      const i = findIndex(state, { id: action.alert });
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];
    }

    case 'CLEAR_ALL':
      return [];

    default:
      return state;
  }
};

export default reducer;