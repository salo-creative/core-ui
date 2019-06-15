import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import Button from '../../Molecules/Button';
import Drop from '../../Molecules/Drop';
import Loader from '../../Molecules/Loader';

// COMPONENTS & STYLES
import { BlankWrapper } from './typeAhead.styles';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const SuggestionsList = (props) => {
  const {
    activeSuggestion,
    background,
    dropState,
    error,
    errorMessage,
    handleSelect,
    loading,
    retryAction,
    setDropState,
    showSuggestions,
    suggestions,
    userInput
  } = props;

  const closeDrop = (e) => {
    if (e.target !== dropState.element && !loading) {
      setDropState({ ...dropState, dropOpen: false });
    }
  };

  const renderItems = () => {
    if (!loading && !error) {
      if (!isEmpty(suggestions)) {
        return suggestions.map((suggestion, index) => (
          <Button
            key={ suggestion.id }
            onClick={ () => handleSelect(suggestion) }
            appearance={ index === activeSuggestion ? 'primary' : 'text' }
            fullWidth
            radius={ false }
            align='start'
            size='M'
          >
            { suggestion.label }
          </Button>
        ));
      }
      return <BlankWrapper>No results found</BlankWrapper>;
    }
    return null;
  };

  const renderLoader = () => {
    if (loading) {
      return (
        <BlankWrapper>
          <Loader
            loaderProps={ {
              size: 40,
              position: 'absolute'
            } }
            display
          />
        </BlankWrapper>
      );
    }
    return null;
  };

  const renderError = () => {
    if (error && !loading) {
      return (
        <BlankWrapper>
          { retryAction && (
            <Button
              onClick={ () => retryAction() }
              iconBefore='sync'
              appearance='text'
            />
          ) }
          <span>{ errorMessage }</span>
        </BlankWrapper>
      );
    }
    return null;
  };

  const renderSuggestions = () => {
    // No input.
    if (!userInput && isEmpty(suggestions)) return null;
    return (
      <Drop
        background={ background }
        width={ get(dropState.element, 'clientWidth', 0) + 2 || 0 }
        disableOverflow={ false }
        element={ dropState.element }
        onClose={ (e) => closeDrop(e) }
        top={ 0 }
        offsetTop={ 2 }
        offsetLeft={ 1 }
        fixed={ false }
        open={ dropState.dropOpen && showSuggestions }
        border={ `1px solid ${ colours.blue }` }
        shadow='none'
        spacing={ 0 }
        zIndex={ 100 }
      >
        { renderLoader() }
        { renderError() }
        { renderItems() }
      </Drop>
    );
  };

  return (
    <React.Fragment>
      { renderSuggestions() }
    </React.Fragment>
  );
};

SuggestionsList.defaultProps = {
  activeSuggestion: 0,
  loading: false,
  retryAction: null,
  showSuggestions: false,
  suggestions: [],
  userInput: ''
};

SuggestionsList.propTypes = {
  activeSuggestion: PropTypes.number,
  background: PropTypes.string.isRequired,
  dropState: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  retryAction: PropTypes.func,
  setDropState: PropTypes.func.isRequired,
  showSuggestions: PropTypes.bool,
  handleSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  suggestions: PropTypes.array,
  userInput: PropTypes.string
};

export default SuggestionsList;