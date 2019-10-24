import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import styled from 'styled-components';

const Wrapper = styled.span`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: ${ ({ disabled }) => (disabled ? 0.3 : 1) };
  ${ ({ position, offSet }) => {
    if (position === 'right') {
      return `
        right: ${ offSet };
      `;
    }
    return `
      left: ${ offSet };
    `;
  } }
`;

const FieldIcon = (props) => {
  const { icon, disabled } = props;
  if (typeof icon === 'string') {
    return (
      <Wrapper
        className='salo-input__icon-wrapper'
        disabled={ disabled }
        offSet='3rem'
        position='left'
      >
        <Icon icon={ icon } />
      </Wrapper>
    );
  }
  const { offset, position, fill } = icon;
  return (
    <Wrapper
      className='salo-input__icon-wrapper'
      disabled={ disabled }
      offSet={ offset || '1rem' }
      position={ position || 'left' }
    >
      <Icon icon={ icon.icon } fill={ fill } />
    </Wrapper>
  );
};

FieldIcon.defaultProps = {
  disabled: false
};

FieldIcon.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    fill: PropTypes.string,
    icon: PropTypes.string.isRequired,
    offset: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right'])
  })]).isRequired
};

export default FieldIcon;