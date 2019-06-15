import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Input from '../Input';

// Components & Styles
import SuggestionsList from './typeAhead.suggestions';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const TypeAhead = (props) => {
  const {
    background,
    debounced,
    error,
    errorMessage,
    loading,
    onChange,
    onSelect,
    name,
    retryAction,
    suggestions,
    ...inputProps
  } = props;

  const [dropState, setDropState] = React.useState({ element: null, dropOpen: false });

  const [state, setState] = React.useState({
    activeSuggestion: 0,
    showSuggestions: false,
    userInput: ''
  });

  const onChangeDebounced = React.useCallback(debounce(onChange, 500), []);

  // Handle keyboard navigation of the drop element
  const navigate = (e) => {
    // Handle enter key
    if (e.keyCode === 13) {
      setState({
        ...state,
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: suggestions[state.activeSuggestion].label
      });
      onSelect(suggestions[state.activeSuggestion]);
    }
    // Handle up arrow
    if (e.keyCode === 38) {
      if (state.activeSuggestion === 0) return;
      setState({ ...state, activeSuggestion: state.activeSuggestion - 1 });
    }
    // Handle down arrow
    if (e.keyCode === 40) {
      if (state.activeSuggestion - 1 === suggestions.length) return;
      setState({ ...state, activeSuggestion: state.activeSuggestion + 1 });
    }
  };

  // useEffect handler for navigate(), fires on state change
  React.useEffect(() => {
    window.addEventListener('keydown', navigate);
    return () => window.removeEventListener('keydown', navigate);
  }, [state]);

  const openDrop = (e) => {
    setDropState({ element: e.target, dropOpen: true });
  };

  // Handle when the user alters the Input
  const handleChange = (event) => {
    const { value, e } = event;

    // Open the dropdown if value is truthy
    if (value) {
      openDrop(e);
    }

    // Handle state update depending on whether suggestions is query-controlled
    setState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: value
    });

    if (debounced) {
      onChangeDebounced({ value, e });
    } else {
      onChange({ value, e });
    }
  };

  // Handle when the user makes a selection from the dropdown
  const handleSelect = (suggestion) => {
    setState({
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: suggestion.label
    });
    onSelect(suggestion);
  };
  
  return (
    <React.Fragment>
      <Input
        background={ background }
        onChange={ handleChange }
        value={ state.userInput }
        name={ `${ name }-input` }
        { ...inputProps }
      />
      <SuggestionsList
        activeSuggestion={ state.activeSuggestion }
        background={ background }
        dropState={ dropState }
        error={ error }
        errorMessage={ errorMessage }
        handleSelect={ handleSelect }
        loading={ loading }
        retryAction={ retryAction }
        showSuggestions={ state.showSuggestions }
        setDropState={ setDropState }
        suggestions={ suggestions }
        userInput={ state.userInput }
      />
    </React.Fragment>
  );
};

TypeAhead.defaultProps = {
  background: colours.grey,
  debounced: false,
  error: false,
  errorMessage: 'Whoops something went wrong!',
  loading: false,
  onChange: () => null,
  onSelect: () => null,
  retryAction: null,
  suggestions: []
};

TypeAhead.propTypes = {
  background: PropTypes.string,
  debounced: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  retryAction: PropTypes.func,
  suggestions: PropTypes.array
};

export default TypeAhead;