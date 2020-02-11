import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

import { Format } from '../editor.styles';

const StyleButton = props => {
  const { style, active, label, icon } = props;

  const onToggle = (event) => {
    event.preventDefault();
    props.onToggle(style);
  };

  return (
    <Format
      className='salo-editor__button'
      type='button'
      isActive={ active }
      onMouseDown={ onToggle }
    >
      { icon ? <Icon icon={ icon } vAlign='middle' size={ 20 } /> : label }
    </Format>
  );
};

StyleButton.defaultProps = {
  icon: ''
};

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onToggle: PropTypes.func.isRequired
};

export default React.memo(StyleButton);