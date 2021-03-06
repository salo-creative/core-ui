const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
      return {
        ...state,
        editorState: action.payload
      };
      
    case 'UPDATE_COUNT':
      return {
        ...state,
        count: action.payload
      };

    case 'TOGGLE_CONTROLS':
      return {
        ...state,
        showControls: action.payload
      };

    case 'TOGGLE_PLACEHOLDER':
      return {
        ...state,
        showPlaceholder: action.payload
      };

    case 'UPDATE_URL':
      return {
        ...state,
        urlValue: action.payload
      };
 
    case 'TOGGLE_LINK_CONTROLS':
      return {
        ...state,
        showURLInput: action.payload,
        urlValue: ''
      };

    case 'CONFIRM_LINK':
      return {
        ...state,
        showURLInput: false,
        urlValue: '',
        editorState: action.payload
      };

    default:
      return state;
  }
};

export default reducer;