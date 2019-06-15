import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { Wrapper, Header, Body, Label, Chevron } from './accordion.styles';

const AccordionItem = (props) => {
  const {
    children,
    iconBefore,
    isOpen,
    label,
    onClick
  } = props;
  
  return (
    <Wrapper>
      <Header
        onClick={ onClick }
      >
        { iconBefore && <Icon size={ 20 } icon={ iconBefore } /> }
        <Label>{ label }</Label>
        <Chevron isOpen={ isOpen }>
          <Icon
            icon='chevron_down'
            isOpen={ isOpen }
            size={ 20 }
          />
        </Chevron>
      </Header>
      { isOpen && (
        <Body>
          { children }
        </Body>
      ) }
    </Wrapper>
  );
};

AccordionItem.defaultProps = {
  iconBefore: '',
  isOpen: false,
  label: 'Accordion item',
  onClick: () => null
};

AccordionItem.propTypes = {
  children: PropTypes.any.isRequired,
  isOpen: PropTypes.bool,
  iconBefore: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default AccordionItem;