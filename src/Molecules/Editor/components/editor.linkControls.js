import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import { RichUtils } from 'draft-js';

import { Format } from '../editor.styles';

const LinkControls = props => {
  const { editorState, dispatch, urlInput } = props;

  const [hasText, setHasText] = React.useState(false);
  const [hasLink, setHasLink] = React.useState(false);

  React.useEffect(() => {
    if (editorState.getSelection().isCollapsed()) {
      setHasText(false);
    } else {
      setHasText(true);
    }

    if (RichUtils.currentBlockContainsLink(editorState)) {
      setHasLink(true);
    } else {
      setHasLink(false);
    }
  }, [editorState]);
  
  const promptForLink = async () => {
    if (hasText) {
      await dispatch({
        type: 'TOGGLE_LINK_CONTROLS',
        payload: true
      });
      setTimeout(() => urlInput.current.focus(), 0);
    }
  };
  
  const removeLink = () => {
    if (hasText) {
      const selection = editorState.getSelection();
      dispatch({
        type: 'UPDATE_EDITOR_STATE',
        payload: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  };

  return (
    <Format
      type='button'
      disabled={ !hasText }
      onClick={ (event) => {
        event.preventDefault();
        dispatch({
          type: 'TOGGLE_CONTROLS',
          payload: true
        });
        if (hasLink) {
          removeLink();
        } else {
          promptForLink();
        }
      } }
    >
      <Icon icon={ hasLink ? 'link_off' : 'link' } />
    </Format>
  );
};

LinkControls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  urlInput: PropTypes.object.isRequired
};

export default LinkControls;