import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { Container, Label, Indicator } from './strength.styles';

// HELPERS & CONSTANTS
import { calculateStrength, evalColour } from './strength.helpers';

const Strength = (props) => {
  const { value } = props;

  const strength = calculateStrength(value);
  const color = evalColour(strength);

  return (
    <Container>
      <Label>Strength:</Label>
      { value && (
        <Indicator
          color={ color }
          width={ `${ strength * 20 }%` }
        />
      ) }
    </Container>
  );
};

Strength.defaultProps = { value: '' };

Strength.propTypes = { value: PropTypes.string };

export default Strength;