import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { Item, ItemButton, Title, IconWrapper } from './flyOut.styles';

// HELPERS
import { colours } from '../../helpers/colours';

const FlyOutLink = (props) => {
  const { icon, title, link } = props;
  return (
    <Item>
      <ItemButton
        to={ link }
        title={ title }
        as={ Link }
        className='salo-flyout__button'
      >
        <Title>{ title }</Title>
        <IconWrapper>
          <Icon fill={ colours.charcoal } icon={ icon } size={ 18 } />
        </IconWrapper>
      </ItemButton>
    </Item>
  );
};

FlyOutLink.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string
};

FlyOutLink.defaultProps = {
  title: '',
  icon: 'dashboard',
  link: ''
};

export default FlyOutLink;