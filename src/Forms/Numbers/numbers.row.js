import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { EntryWrapper, ReadOnly, EntryColumn, ButtonsWrapper } from './numbers.styles';
import Select from '../Select';
import Input from '../Input';
import Button from '../../Molecules/Button';
import FlyOut, { FlyOutButton } from '../../Molecules/FlyOut';

// CONSTANTS & HELPERS
import { phoneRegExp } from '../../helpers/form';

const types = ['Mobile', 'Home', 'Work', 'Office', 'Reception', 'Other'];

const checkValid = (value) => {
  const phoneRegex = RegExp(phoneRegExp, 'g');
  return phoneRegex.test(value);
};

const NumbersRow = (props) => {
  const {
    cancelAdd,
    disabled,
    hasData,
    index,
    onChange,
    onRemove,
    setEdit,
    size,
    value
  } = props;

  const [edit, toggleEdit] = React.useState(false);
  const [state, setState] = React.useState(value);

  // De-structure state
  const {
    phone_type: phoneType,
    phone_number: phoneNumber
  } = state;

  const isValid = phoneType && phoneNumber && checkValid(phoneNumber);

  const renderEdit = () => {
    if (edit || setEdit) {
      return (
        <React.Fragment>
          <EntryColumn default={ 3 } padding='1rem 1rem 1rem 0'>
            <Select
              disabled={ disabled }
              name='phone_type'
              margin='0'
              required
              size={ size }
              value={ phoneType }
              onChange={ ({ value: type }) => setState({ ...state, phone_type: type }) }
            >
              <option value=''>Please select…</option>
              { types.map(type => (
                <option
                  key={ type }
                  value={ type.toLowerCase() }
                >
                  { type }
                </option>
              )) }
            </Select>
          </EntryColumn>
          <EntryColumn default={ 6 }>
            <Input
              disabled={ disabled }
              type='tel'
              placeholder='Phone number'
              required
              margin='0'
              name='phone_number'
              size={ size }
              value={ phoneNumber }
              onChange={ ({ value: number }) => setState({ ...state, phone_number: number }) }
            />
          </EntryColumn>
          <EntryColumn default={ 3 } padding='1rem 0 1rem 1rem'>
            <ButtonsWrapper>
              { hasData && (
                <Button
                  onClick={ () => {
                    cancelAdd();
                    toggleEdit(false);
                  } }
                  appearance='error'
                  size={ size }
                  iconBefore='close'
                  style={ { margin: '0 1rem 0 0' } }
                />
              ) }
              <Button
                appearance='success'
                onClick={ () => {
                  toggleEdit(false);
                  onChange({ i: index, data: state });
                } }
                disabled={ !isValid }
                size={ size }
                iconBefore='tick'
              />
            </ButtonsWrapper>
          </EntryColumn>
        </React.Fragment>
      );
    }
    return null;
  };
  
  const renderReadOnly = () => {
    if (!edit && !setEdit) {
      return (
        <React.Fragment>
          <EntryColumn default={ 11 } padding='1rem 1rem 1rem 0'>
            <ReadOnly><strong>{ state.phone_type }:</strong> { state.phone_number }</ReadOnly>
          </EntryColumn>
          <EntryColumn default={ 1 } padding='1rem 0 1rem 1rem'>
            <FlyOut context='table'>
              <FlyOutButton title='Remove' onClick={ () => onRemove(index) } icon='close' />
              <FlyOutButton
                title='Edit'
                onClick={ ({ toggle }) => {
                  toggleEdit(true);
                  toggle();
                } }
                icon='pencil'
              />
            </FlyOut>
          </EntryColumn>
        </React.Fragment>
      );
    }
    return null;
  };

  // render
  return (
    <EntryWrapper>
      { renderEdit() }
      { renderReadOnly() }
    </EntryWrapper>
  );
};

NumbersRow.defaultProps = {
  cancelAdd: () => null,
  onChange: () => null,
  onRemove: () => null,
  setEdit: false,
  value: {
    phone_type: '',
    phone_number: ''
  }
};

NumbersRow.propTypes = {
  cancelAdd: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  setEdit: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']).isRequired,
  value: PropTypes.shape({
    phone_type: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired
  })
};

export default NumbersRow;