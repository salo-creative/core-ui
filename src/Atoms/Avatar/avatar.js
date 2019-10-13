import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { AvatarWrapper, TextWrapper } from './avatar.styles';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const Avatar = (props) => {
  const { firstName, lastName, colour, size, image, onClick } = props;

  const hasAction = typeof onClick === 'function';

  const handleClick = (e) => {
    if (hasAction) {
      onClick({ e });
    }
  };
  
  return (
    <AvatarWrapper
      size={ size }
      image={ image }
      background={ colour }
      onClick={ handleClick }
      cursor={ hasAction ? 'pointer' : 'auto' }
    >
      <TextWrapper
        colour={ colour }
      >
        { !image ? `${ firstName.charAt(0) }${ lastName.charAt(0) }` : '' }
      </TextWrapper>
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  image: '',
  firstName: 'Avatar',
  lastName: 'Fallback',
  colour: colours.blue,
  onClick: null,
  size: 100
};

Avatar.propTypes = {
  image: PropTypes.string,

  // Fallback if image not available
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  colour: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number
};

export default Avatar;