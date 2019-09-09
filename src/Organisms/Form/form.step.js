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
    ...fieldProps
  } = props;

  return (
    <React.Fragment>
      { isEmpty(fields) && <P>No fields found for this step</P> }
      { !isEmpty(fields) && (
        <RenderFields
          { ...fieldProps } // eslint-disable-line react/jsx-props-no-spreading
          fields={ fields }
        />
      ) }
      <div>
        { /* If last page render submit */ }
        { step === total && (
          <Button type='submit'>Submit</Button>
        ) }
        { /* If not last page render next */ }
        { step < total && (
          <Button type='submit'>Next</Button>
        ) }
        { /* If not first page render previous */ }
        { step > 1 && (
          <Button onClick={ changeStep } type='button'>Previous</Button>
        ) }
      </div>
    </React.Fragment>
  );
};

FormStep.propTypes = {
  changeStep: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default FormStep;