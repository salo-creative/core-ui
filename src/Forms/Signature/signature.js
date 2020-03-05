import React from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-canvas';

import { isBrowser } from '../../helpers/environments';
import { dataURItoBlob } from '../../helpers/files';
import Button from '../../Molecules/Button';
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
    size,
    inputs
  } = props;

  const CustomButton = inputs.Button || Button;

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
    const blob = dataURItoBlob(exportPad());

    onChange({
      value: blob
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
        { isBrowser && (
          <SignaturePad
            canvasProps={ {
              className: 'salo-signature__canvas',
              ...canvasProps
            } }
            onEnd={ handleChange }
            ref={ pad }
          />
        ) }
      </div>
      <div className='salo-signature__buttons'>
        <CustomButton
          type='button'
          className='salo-signature__button salo-signature__button--clear'
          onClick={ clearPad }
        >
          Clear
        </CustomButton>
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
  inputs: {},
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
  inputs: PropTypes.shape({
    Button: PropTypes.any
  }),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default Signature;