import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Stepper from '../../Molecules/Stepper';
import FormStep from './form.step';

const FormStepper = (props) => {
  const {
    activeStep,
    changeStep,
    steps,
    ...fieldProps
  } = props;

  return (
    <React.Fragment>
      <Stepper
        activeItem={ activeStep }
        changeStep={ changeStep }
        className='form__stepper'
      >
        { steps.map((step, i) => {
          return {
            id: step.id,
            title: step.title,
            complete: step.complete,
            disabled: step.disabled,
            content: (
              <FormStep
                { ...fieldProps } // eslint-disable-line react/jsx-props-no-spreading
                changeStep={ () => changeStep(get(steps, `[${ i - 1 }].id`)) }
                fields={ step.fields }
                step={ i + 1 } // pass the step number down
                total={ steps.length } // pass down the total number of steps
              />
            )
          };
        }) }
      </Stepper>
    </React.Fragment>
  );
};

FormStepper.defaultProps = { activeStep: '' };

FormStepper.propTypes = {
  activeStep: PropTypes.string,
  changeStep: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired
};

export default FormStepper;