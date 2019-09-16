import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// COMPONENTS & STYLES
import P from '../../Typography/P';
import RenderFields from './form.renderFields';
import Button from '../../Molecules/Button';

const FormStep = (props) => {
  const {
    changeStep,
    fields,
    step,
    total,
    typeaheads,
    CustomButton, // eslint-disable-line react/prop-types
    ...fieldProps
  } = props;

  // Check if we have a custom button
  const FormButton = CustomButton || Button;

  return (
    <React.Fragment>
      { isEmpty(fields) && <P>No fields found for this step</P> }
      { !isEmpty(fields) && (
        <RenderFields
          { ...fieldProps } // eslint-disable-line react/jsx-props-no-spreading
          fields={ fields }
          typeaheads={ typeaheads }
        />
      ) }
      <div className='form__stepper-buttons'>
        { /* If last page render submit */ }
        { step === total && (
          <FormButton type='submit'>Submit</FormButton>
        ) }
        { /* If not last page render next */ }
        { step < total && (
          <FormButton type='submit'>Next</FormButton>
        ) }
        { /* If not first page render previous */ }
        { step > 1 && (
          <FormButton onClick={ changeStep } type='button'>Previous</FormButton>
        ) }
      </div>
    </React.Fragment>
  );
};

FormStep.defaultProps = { typeaheads: null };

FormStep.propTypes = {
  changeStep: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  typeaheads: PropTypes.object
};

export default FormStep;