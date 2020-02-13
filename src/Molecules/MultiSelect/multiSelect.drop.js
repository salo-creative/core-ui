import React from 'react';
import PropTypes from 'prop-types';
import { without, uniq } from 'lodash';
import Transition from 'react-transition-group/Transition';

// COMPONENTS & STYLES
import Loader from '../Loader';
import {
  MultiSelectDrop,
  MultiSelectOption,
  MultiSelectCheck,
  MultiSelectErrorText,
  MultiSelectFooterControls,
  MultiSelectFooterButton
} from './multiSelect.styles';

// HELPERS & CONSTANTS

const Drop = ({
  close,
  dropHeight,
  keyLabel,
  keyValue,
  onApply,
  open,
  options,
  optionsLoading,
  optionsError,
  value
}) => {
  const [selected, setSelected] = React.useState(value);
  // Handle option select
  const handleSelect = (val) => {
    let newSelected = [];
    if (selected.includes(val)) { // If val in selected remove it
      newSelected = without(selected, val);
    } else { // otherwise add it
      newSelected = [...selected, val];
    }
    setSelected(uniq(newSelected)); // de-dupe and set
  };

  return (
    <Transition
      in={ open }
      timeout={ 200 }
      unmountOnExit
    >
      { state => (
        <MultiSelectDrop
          className='salo-multi-select__drop'
          height={ dropHeight }
          state={ state }
        >
          { optionsLoading && (
            <Loader
              display
              loaderProps={ {
                size: 40,
                position: 'absolute'
              } }
            />
          ) }

          { !optionsLoading && optionsError && (
            <MultiSelectErrorText>There was an error loading your data</MultiSelectErrorText>
          ) }
          { !optionsError && !optionsLoading && (
            <React.Fragment>
              { options.map(option => {
                const isActive = selected.includes(option[keyValue]);
                return (
                  <MultiSelectOption
                    key={ option[keyValue] }
                    className={ `salo-multi-select__option ${ isActive ? 'active' : '' }` }
                    onClick={ () => handleSelect(option[keyValue]) }
                  >
                    <MultiSelectCheck className='salo-multi-select__option-check'>
                      <svg viewBox='0 0 24 24'>
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                    </MultiSelectCheck>
                    <span>{ option[keyLabel] }</span>
                  </MultiSelectOption>
                );
              }) }
              <MultiSelectFooterControls
                className='salo-multi-select__footer-controls'
              >
                <MultiSelectFooterButton
                  className='salo-multi-select__footer-button cancel'
                  onClick={ () => {
                    close(); // Close drop
                    setSelected(value); // reset selection
                  } }
                >
                  Cancel
                </MultiSelectFooterButton>
                <MultiSelectFooterButton
                  className='salo-multi-select__footer-button apply'
                  onClick={ () => {
                    close(); // Close drop
                    onApply(selected);
                  } }
                >
                  Apply
                </MultiSelectFooterButton>
              </MultiSelectFooterControls>
            </React.Fragment>
          ) }
        </MultiSelectDrop>
      ) }
    </Transition>
  );
};

Drop.defaultProps = {
  options: [],
  optionsError: false,
  optionsLoading: false
};

Drop.propTypes = {
  close: PropTypes.func.isRequired,
  dropHeight: PropTypes.string.isRequired,
  keyValue: PropTypes.string.isRequired,
  keyLabel: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  optionsError: PropTypes.bool,
  optionsLoading: PropTypes.bool,
  value: PropTypes.array.isRequired
};

export default Drop;