import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import Loader from '../Loader';

// COMPONENTS & STYLES
import { PillWrapper, HiddenCloseButton } from './pills.styles';

const Pill = (props) => {
  const {
    background,
    color,
    height,
    label,
    loading,
    margin,
    onRemove,
    padding,
    value
  } = props;
 
  return (
    <PillWrapper
      color={ color }
      background={ background }
      height={ height }
      margin={ margin }
      loading={ loading }
      padding={ padding }
    >
      { loading && (
        <Loader
          display={ true }
          loaderProps={ { size: 40, position: 'absolute' } }
          appearance='light'
        />
      ) }
      { label }
      { onRemove && (
      <HiddenCloseButton
        onClick={ () => onRemove(value) }
        disabled={ loading }
        loading={ loading }
        padding={ padding }
      >
        <Icon
          size={ 20 }
          icon='close'
        />
      </HiddenCloseButton>
      ) }
      
    </PillWrapper>
  );
};

Pill.defaultProps = {
  background: 'grey',
  color: 'black',
  height: '4rem',
  label: '',
  loading: false,
  margin: '',
  onRemove: null,
  padding: '1.5rem',
  value: ''
};

Pill.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.string,
  onRemove: PropTypes.func,
  padding: PropTypes.string,
  value: PropTypes.string
};

export default Pill;