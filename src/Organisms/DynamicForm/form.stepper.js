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
    position,
    showTitles,
    steps,
    stepper,
    strings,
    typeaheads,
    inputs,
    ...fieldProps
  } = props;

  return (
    <React.Fragment>
      <Stepper
        activeItem={ activeStep }
        changeStep={ changeStep }
        className='form__stepper'
        position={ position }
        stepper={ stepper }
      >
        { steps.map((step, i) => {
          return {
            id: step.id,
            title: step.title,
            complete: step.complete,
            disabled: step.disabled,
            content: (
              <FormStep
                { ...fieldProps }
                inputs={ inputs }
                changeStep={ () => changeStep(get(steps, `[${ i - 1 }].id`)) }
                fields={ step.fields }
                showTitle={ showTitles } // show individual titles
                step={ i + 1 } // pass the step number down
                strings={ strings }
                title={ step.title }
                total={ steps.length } // pass down the total number of steps
                typeaheads={ typeaheads }
              />
            )
          };
        }) }
      </Stepper>
    </React.Fragment>
  );
};

FormStepper.defaultProps = {
  activeStep: '',
  isSubmitting: false,
  position: 'below',
  stepper: 'full',
  strings: null,
  typeaheads: null
};

FormStepper.propTypes = {
  activeStep: PropTypes.string,
  changeStep: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool,
  position: PropTypes.string,
  showTitles: PropTypes.bool.isRequired,
  stepper: PropTypes.string,
  steps: PropTypes.array.isRequired,
  strings: PropTypes.object,
  typeaheads: PropTypes.object
};

export default FormStepper;