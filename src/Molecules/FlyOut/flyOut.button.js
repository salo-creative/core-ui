import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { Item, ItemButton, Title, IconWrapper } from './flyOut.styles';

// HELPERS
import { colours } from '../../helpers/colours';

const FlyOutButton = (props) => {
  const { icon, onClick, title, toggle } = props;
  return (
    <Item>
      <ItemButton
        onClick={ (e) => onClick({ e, toggle }) }
        title={ title }
        className='salo-flyout__button'
      >
        <Title>{ title }</Title>
        <IconWrapper>
          <Icon fill={ colours.charcoal } icon={ icon } size={ 24 } />
        </IconWrapper>
      </ItemButton>
    </Item>
  );
};

FlyOutButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  toggle: PropTypes.func
};

FlyOutButton.defaultProps = {
  title: '',
  icon: 'dashboard',
  toggle: () => null
};

export default FlyOutButton;