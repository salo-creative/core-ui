import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import Loader from '../Loader';

// COMPONENTS & STYLES
import { PillWrapper, HiddenButton } from './pills.styles';

const Pill = (props) => {
  const {
    background,
    border,
    color,
    height,
    label,
    loading,
    margin,
    onAdd,
    onRemove,
    padding,
    shadow,
    value
  } = props;
 
  return (
    <PillWrapper
      background={ background }
      border={ border }
      color={ color }
      height={ height }
      isLoading={ loading }
      margin={ margin }
      padding={ padding }
      shadow={ shadow }
    >
      { loading && (
        <Loader
          display={ true }
          loaderProps={ { size: 40, position: 'absolute' } }
          appearance='light'
        />
      ) }
      { label }
      { onAdd && (
        <HiddenButton
          onClick={ () => onAdd(value) }
          disabled={ loading }
          isLoading={ loading }
          padding={ padding }
        >
          <Icon
            size={ 20 }
            icon='plus'
          />
        </HiddenButton>
      ) }
      { onRemove && (
        <HiddenButton
          onClick={ () => onRemove(value) }
          disabled={ loading }
          isLoading={ loading }
          padding={ padding }
        >
          <Icon
            size={ 20 }
            icon='close'
          />
        </HiddenButton>
      ) }
      
    </PillWrapper>
  );
};

Pill.defaultProps = {
  background: 'grey',
  border: 'none',
  color: 'black',
  height: '4rem',
  label: '',
  loading: false,
  margin: '',
  onAdd: null,
  onRemove: null,
  padding: '1.5rem',
  shadow: null,
  value: ''
};

Pill.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.string,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  padding: PropTypes.string,
  shadow: PropTypes.string,
  value: PropTypes.string
};

export default Pill;