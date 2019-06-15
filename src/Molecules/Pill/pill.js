import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import Loader from '../Loader';

// COMPONENTS & STYLES
import { PillWrapper, HiddenCloseButton } from './pills.styles';
import { colours } from '../../helpers/colours';

const Pill = (props) => {
  const {
    background,
    color,
    label,
    loading,
    margin,
    onRemove,
    value
  } = props;
 
  return (
    <PillWrapper
      color={ color }
      background={ background }
      margin={ margin }
      loading={ loading }
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
  label: '',
  loading: false,
  margin: '',
  onRemove: null,
  value: ''
};

Pill.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.string,
  onRemove: PropTypes.func,
  value: PropTypes.string
};

export default Pill;