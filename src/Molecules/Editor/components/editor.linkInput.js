import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import { RichUtils } from 'draft-js';

import { LinkButton, URLInput } from '../editor.styles';
import { urlRegex } from '../../../helpers/form';

const LinkInput = props => {
  const { urlInput, urlValue, dispatch, editorState, editorEl } = props;

  const confirmLink = async (event) => {
    event.preventDefault();
    
    // Update editor state with the link.
    const contentStateWithEntity = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', {
      url: urlValue
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    await dispatch({
      type: 'CONFIRM_LINK',
      payload: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
    });

    setTimeout(() => editorEl.current.focus(), 0);
  };

  const handleLinkInput = (event) => {
    if (event.key === 'Enter') {
      confirmLink(event);
    }
  };

  const onURLChange = (event) => dispatch({
    type: 'UPDATE_URL',
    payload: event.target.value
  });

  const close = () => dispatch({
    type: 'TOGGLE_LINK_CONTROLS',
    payload: false
  });

  return (
    <React.Fragment>
      <Icon icon='link' />
      <URLInput
        type='url'
        onChange={ onURLChange }
        ref={ urlInput }
        value={ urlValue }
        onKeyPress={ handleLinkInput }
        placeholder='Enter link'
      />
      <LinkButton
        type='button'
        onClick={ close }
        hoverColour='red'
        xSize='2rem'
      >
        <Icon icon='close' fill='#fff' vAlign='middle' size={ 15 } />
      </LinkButton>
      <LinkButton
        type='button'
        hoverColour='green'
        disabled={ !urlRegex.test(urlValue) }
        onClick={ confirmLink }
      >
        <Icon icon='tick' fill='#fff' vAlign='middle' />
      </LinkButton>
    </React.Fragment>
  );
};

LinkInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editorEl: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  urlInput: PropTypes.object.isRequired,
  urlValue: PropTypes.string.isRequired
};

export default LinkInput;