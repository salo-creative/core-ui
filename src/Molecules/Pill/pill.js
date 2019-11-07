import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import Loader from '../Loader';

// COMPONENTS & STYLES
import { PillWrapper, HiddenButton, Text } from './pills.styles';

const Pill = React.forwardRef((props, ref) => {
  const {
    background,
    border,
    color,
    fontSize,
    height,
    inlineLoader,
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
      fontSize={ fontSize }
      height={ height }
      inlineLoader={ inlineLoader }
      isLoading={ loading }
      margin={ margin }
      padding={ padding }
      shadow={ shadow }
    >
      { loading && !inlineLoader && (
        <Loader
          display={ true }
          loaderProps={ {
            size: 40, position: 'absolute'
          } }
          appearance='light'
        />
      ) }
      <Text
        margin={ onAdd || onRemove ? '0 1.5rem 0 0' : '0' }
      >{ label }
      </Text>
      { onAdd && (
        <HiddenButton
          disabled={ loading }
          inlineLoader={ inlineLoader }
          isLoading={ loading }
          onClick={ () => onAdd(value) }
          ref={ ref }
          tabIndex={ 0 }
        >
          <Icon
            size={ 20 }
            icon={ loading ? 'sync' : 'plus' }
          />
        </HiddenButton>
      ) }
      { onRemove && (
        <HiddenButton
          disabled={ loading }
          inlineLoader={ inlineLoader }
          isLoading={ loading }
          onClick={ () => onRemove(value) }
          ref={ ref }
          tabIndex={ 0 }
        >
          <Icon
            size={ 20 }
            icon={ loading ? 'sync' : 'close' }
          />
        </HiddenButton>
      ) }
      
    </PillWrapper>
  );
});

Pill.defaultProps = {
  background: 'grey',
  border: 'none',
  color: 'black',
  fontSize: '1.6rem',
  height: '4rem',
  inlineLoader: false,
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
  fontSize: PropTypes.string,
  height: PropTypes.string,
  inlineLoader: PropTypes.bool,
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