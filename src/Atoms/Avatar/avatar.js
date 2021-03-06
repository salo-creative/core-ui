import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { AvatarWrapper, TextWrapper } from './avatar.styles';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const Avatar = React.memo(props => {
  const {
    className,
    colour,
    fontColour,
    firstName,
    image,
    lastName,
    onClick,
    size
  } = props;

  const hasAction = typeof onClick === 'function';

  const handleClick = (e) => {
    if (hasAction) {
      onClick({
        e
      });
    }
  };
  
  return (
    <AvatarWrapper
      className={ className }
      size={ size }
      image={ image }
      background={ colour }
      onClick={ handleClick }
      cursor={ hasAction ? 'pointer' : 'auto' }
      as={ hasAction ? 'button' : 'div' }
    >
      <TextWrapper
        colour={ fontColour }
      >
        { !image ? `${ firstName.charAt(0) }${ lastName ? lastName.charAt(0) : '' }` : '' }
      </TextWrapper>
    </AvatarWrapper>
  );
});

Avatar.defaultProps = {
  className: null,
  image: '',
  firstName: 'Undefined',
  lastName: '',
  colour: colours.blue,
  fontColour: null,
  onClick: null,
  size: 100
};

Avatar.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,

  // Fallback if image not available
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  colour: PropTypes.string,
  fontColour: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number
};

export default Avatar;