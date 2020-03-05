import React from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-canvas';

import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';

const Signature = props => {
  const {
    canvasProps,
    className,
    error,
    errorMessage,
    label,
    name,
    helperText,
    onChange,
    required,
    size
  } = props;

  const pad = React.useRef();

  const clearPad = () => {
    pad.current.clear();
  };

  const exportPad = () => {
    if (!pad.current) {
      return null;
    }
    return pad.current.getTrimmedCanvas()
      .toDataURL('image/png');
  };

  const handleChange = () => {
    onChange({
      value: exportPad()
    });
  };

  return (
    <div className={ `${ className } salo-signature` }>
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
        className='salo-signature__label'
      />
      <div className='salo-signature__wrapper'>
        <SignaturePad
          canvasProps={ {
            className: 'salo-signature__canvas',
            ...canvasProps
          } }
          onEnd={ handleChange }
          ref={ pad }
        />
      </div>
      <div className='salo-signature__buttons'>
        <button
          type='button'
          className='salo-signature__clear'
          onClick={ clearPad }
        >
          Clear
        </button>
      </div>
      <ErrorText
        className='salo-signature__error'
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-signature__helper'
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </div>
  );
};

Signature.defaultProps = {
  canvasProps: {},
  className: '',
  error: false,
  errorMessage: 'Please write your signature',
  helperText: '',
  label: '',
  required: false,
  size: 'M'
};

Signature.propTypes = {
  canvasProps: PropTypes.object,
  className: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default Signature;