import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { CardWrapper } from './card.styles';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const Card = (props) => {
  const { background, borderRadius, children, margin, padding } = props;

  return (
    <CardWrapper
      background={ background }
      borderRadius={ borderRadius }
      margin={ margin }
      padding={ padding }
    >
      { children }
    </CardWrapper>
  );
};

Card.defaultProps = {
  background: colours.grey,
  borderRadius: '0.4rem',
  children: 'No content supplied!',
  margin: '0',
  padding: '2rem'
};

Card.propTypes = {
  background: PropTypes.string,
  borderRadius: PropTypes.string,
  children: PropTypes.any,
  margin: PropTypes.string,
  padding: PropTypes.string
};
export default Card;