import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { Wrapper, Divider, AddButton } from './numbers.styles';
import NumbersRow from './numbers.row';
import Label from '../components/Label';
import HelperText from '../components/HelperText';
import ErrorText from '../components/ErrorText';

// CONSTANTS & HELPERS

const Numbers = (props) => {
  const {
    disabled,
    error,
    errorMessage,
    helperText,
    label,
    margin,
    name,
    onChange,
    required,
    size,
    value
  } = props;

  const [add, toggleAdd] = React.useState(false);

  const hasData = !isEmpty(value);

  const handleRemove = (i) => {
    const newValue = [
      ...value.slice(0, i),
      ...value.slice(i + 1)
    ];
    onChange({ value: newValue });
  };

  const handleEdit = ({ i, data }) => {
    const newValue = [
      ...value.slice(0, i),
      data,
      ...value.slice(i + 1)
    ];
    onChange({ value: newValue });
  };

  const handleAdd = ({ i, data }) => {
    const newValue = [
      ...value.slice(0, i),
      data,
      ...value.slice(i + 1)
    ];
    toggleAdd(false);
    onChange({ value: newValue });
  };

  return (
    <Wrapper margin={ margin } disabled={ disabled }>
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
      />
      <AddButton
        onClick={ () => toggleAdd(true) }
      >
        <Icon icon='plus' size={ 14 } margin='0 0.5rem 0 0' />
          Add number
      </AddButton>
      <Divider />
      { hasData && value.map((val, i) => (
        <NumbersRow
          key={ val.phone_number }
          hasData={ hasData }
          index={ i }
          onChange={ handleEdit }
          onRemove={ handleRemove }
          value={ val }
          disabled={ disabled }
          size={ size }
        />
      )) }
      { (!hasData || add) && (
        <NumbersRow
          cancelAdd={ () => toggleAdd(false) }
          disabled={ disabled }
          hasData={ hasData }
          index={ value.length }
          onChange={ handleAdd }
          setEdit={ true }
          size={ size }
        />
      ) }
      <ErrorText
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </Wrapper>
  );
};

Numbers.defaultProps = {
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onChange: () => null,
  required: false,
  size: 'M',
  value: []
};

Numbers.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.arrayOf(PropTypes.shape({
    phone_type: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired
  }))
};

export default Numbers;