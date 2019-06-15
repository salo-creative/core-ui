import React from 'react';
import PropTypes from 'prop-types';

// Components.
import Icon from '@salo/icons';
import { SectionHead, SectionBody } from './accordion.styles';
import H3 from '../../Typography/H3';

const AccordionSection = (props) => {
  const {
    children,
    isOpen,
    title,
    onClick,
    iconBefore
  } = props;

  const sectionClick = () => {
    onClick(title);
  };

  return (
    <div>
      <SectionHead onClick={ sectionClick } isOpen={ isOpen }>
        { iconBefore && (
          <Icon icon={ iconBefore } margin='0 0 0 1rem' />
        ) }
        <H3 margin='1rem'>
          { title }
        </H3>
        { isOpen && (
          <Icon icon='chevron_down' margin='0 1rem 0 0' size={ 35 } />
        ) }
        { !isOpen && (
          <Icon icon='chevron_up' margin='0 1rem 0 0' size={ 35 } />
        ) }
      </SectionHead>
      { isOpen && (
        <SectionBody>
          { children }
        </SectionBody>
      ) }
    </div>
  );
};

AccordionSection.defaultProps = {
  iconBefore: null,
  isOpen: false
};

AccordionSection.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  iconBefore: PropTypes.string
};

export default AccordionSection;