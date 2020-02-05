import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';

// COMPONENTS & STYLES
import P from '../../Typography/P';
import H1 from '../../Typography/H1';
import RenderFields from './form.renderFields';
import Button from '../../Molecules/Button';

const FormStep = (props) => {
  const {
    changeStep,
    fields,
    showTitle,
    step,
    strings,
    title,
    total,
    typeaheads,
    inputs,
    isSubmitting,
    ...fieldProps
  } = props;

  // Check if we have a custom button
  const FormButton = inputs.Button || Button;
  const FormHeading = inputs.Heading || H1;

  return (
    <React.Fragment>
      { showTitle && (
        <FormHeading className='form__stepper-title'>
          { title }
        </FormHeading>
      ) }
      { isEmpty(fields) && <P>No fields found for this step</P> }
      { !isEmpty(fields) && (
        <RenderFields
          { ...fieldProps }
          fields={ fields }
          inputs={ inputs }
          typeaheads={ typeaheads }
        />
      ) }
      <div className='form__stepper-buttons'>
        { /* If not first page render previous */ }
        { step > 1 && (
          <FormButton onClick={ changeStep } type='button'>{ get(strings, 'previous', 'Previous') }</FormButton>
        ) }
        { /* If last page render submit */ }
        { step === total && (
          <FormButton type='submit' loading={ isSubmitting }>{ get(strings, 'submit', 'Submit') }</FormButton>
        ) }
        { /* If not last page render next */ }
        { step < total && (
          <FormButton type='submit'>{ get(strings, 'next', 'Next') }</FormButton>
        ) }
        
      </div>
    </React.Fragment>
  );
};

FormStep.defaultProps = {
  showTitle: false,
  strings: {},
  typeaheads: null
};

FormStep.propTypes = {
  changeStep: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  showTitle: PropTypes.bool,
  step: PropTypes.number.isRequired,
  inputs: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  strings: PropTypes.shape({
    next: PropTypes.string,
    previous: PropTypes.string,
    submit: PropTypes.string
  }),
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  typeaheads: PropTypes.object
};

export default FormStep;