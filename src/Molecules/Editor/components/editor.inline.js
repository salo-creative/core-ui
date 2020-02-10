import React from 'react';
import PropTypes from 'prop-types';

import StyleButton from './editor.stylebutton';

const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD',
    icon: 'format_bold'
  },
  {
    label: 'Italic',
    style: 'ITALIC',
    icon: 'format_italic'
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    icon: 'format_underline'
  }
];

const InlineStyleControls = (props) => {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  
  return INLINE_STYLES.map((type) => (
    <StyleButton
      key={ type.label }
      active={ currentStyle.has(type.style) }
      label={ type.label }
      onToggle={ onToggle }
      style={ type.style }
      icon={ type.icon }
    />
  ));
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InlineStyleControls;