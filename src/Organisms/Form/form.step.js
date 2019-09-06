import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// COMPONENTS & STYLES
import P from '../../Typography/P';
import RenderFields from './form.renderFields';
import Button from '../../Molecules/Button';

const FormStep = (props) => {
  const {
    fields,
    step,
    total,
    ...fieldProps
  } = props;

  if (isEmpty(fields)) return <P>No fields found for this step</P>;
  return (
    <React.Fragment>
      <RenderFields
        { ...fieldProps } // eslint-disable-line react/jsx-props-no-spreading
        fields={ fields }
      />
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
          <Button type='button'>Previous</Button>
        ) }
      </div>
    </React.Fragment>
  );
};

FormStep.propTypes = {
  fields: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default FormStep;