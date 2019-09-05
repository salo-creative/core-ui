import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { NavWrapper, NavItem } from './stepper.styles';

const Navigation = (props) => {
  const {
    activeItem,
    changeStep,
    steps
  } = props;

  const evaluateClassName = ({ active, complete, visited }) => {
    if (active) {
      return 'active';
    }
    if (complete) {
      return 'complete';
    }
    if (visited) {
      return 'error';
    }
    return '';
  };

  return (
    <NavWrapper>
      { steps.map(step => {
        const active = activeItem === step.id;
        return (
          <NavItem
            key={ step.id }
            className={ evaluateClassName({ ...step, active }) }
            onClick={ () => changeStep(step.id) }
            disabled={ step.disabled }
          >
            { step.title }
          </NavItem>
        );
      }) }
    </NavWrapper>
  );
};

Navigation.defaultProps = {};

Navigation.propTypes = {
  activeItem: PropTypes.string.isRequired,
  changeStep: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool,
    visited: PropTypes.bool,
    disabled: PropTypes.bool
  })).isRequired
};

export default Navigation;