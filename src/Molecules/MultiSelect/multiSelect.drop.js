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
  onChange,
  open,
  options,
  optionsLoading,
  optionsError,
  requireConfirm,
  value
}) => {
  const [selected, setSelected] = React.useState(value);

  // If we are requiring user to click apply use local state
  const selectedItems = requireConfirm ? selected : value;

  // Handle option select
  const handleSelect = (val) => {
    let newSelected = [];
    if (selectedItems.includes(val)) { // If val in selected remove it
      newSelected = without(selectedItems, val);
    } else { // otherwise add it
      newSelected = [...selectedItems, val];
    }

    // Use local state or parent state depending on if confirm is required
    if (requireConfirm) {
      setSelected(uniq(newSelected)); // de-dupe and set
    } else {
      onChange(uniq(newSelected));
    }
  };

  React.useEffect(() => {
    if (requireConfirm && value !== selected) {
      setSelected(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
                const isActive = selectedItems.includes(option[keyValue]);
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
              { requireConfirm && (
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
                      onChange(selected);
                    } }
                  >
                  Apply
                  </MultiSelectFooterButton>
                </MultiSelectFooterControls>
              ) }
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
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  optionsError: PropTypes.bool,
  optionsLoading: PropTypes.bool,
  requireConfirm: PropTypes.bool.isRequired,
  value: PropTypes.array.isRequired
};

export default Drop;