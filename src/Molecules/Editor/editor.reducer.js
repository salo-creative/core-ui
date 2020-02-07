const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
      return {
        ...state,
        editorState: action.payload
      };

    case 'UPDATE_URL':
      return {
        ...state,
        urlValue: action.payload
      };
 
    case 'PROMPT_FOR_LINK':
      return {
        ...state,
        showURLInput: true,
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