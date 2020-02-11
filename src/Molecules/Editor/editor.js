import React from 'react';
import PropTypes from 'prop-types';
import {
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertFromHTML
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

// COMPONENTS & STYLES
import { Wrapper, Controls } from './editor.styles';
import BlockStyleControls from './components/editor.block';
import CharacterCount from './components/editor.characters';
import InlineStyleControls from './components/editor.inline';
import Link from './components/editor.link';
import LinkControls from './components/editor.linkControls';
import UrlInput from './components/editor.linkInput';

// HELPERS & CONSTANTS
import { isBrowser } from '../../helpers/environments';
import reducer from './editor.reducer';
import {
  defaultStyleMap,
  getBlockStyle,
  findLinkEntities,
  getCharCount
} from './editor.helpers';

const WYSIWYG = (props) => {
  const {
    className,
    placeholder,
    value,
    onExport,
    limit,
    styleMap
  } = props;

  // * Refs (used to focus)
  const editorEl = React.useRef();
  const urlInput = React.useRef();
  const wrapperEl = React.useRef();
  
  // Setup ability to add anchor tags.
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);

  // Evaluate if we need to decode HTML.
  const blocks = (() => {
    if (!value) {
      return null;
    }
    try {
      const blocksFromHTML = convertFromHTML(value);
      return ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
    } catch (error) {
      return null;
    }
  })();
  
  const [state, dispatch] = React.useReducer(reducer, {
    // Either create from pre-populated HTML or empty
    editorState: blocks ? EditorState.createWithContent(blocks, decorator) : EditorState.createEmpty(decorator),
    showControls: false,
    showPlaceholder: false,
    showURLInput: false,
    urlValue: '',
    count: 0
  });

  const {
    editorState,
    showControls,
    showPlaceholder,
    showURLInput,
    urlValue,
    count
  } = state;

  React.useEffect(() => {
    // Update count on first mount
    if (typeof limit === 'number') {
      dispatch({
        type: 'UPDATE_COUNT',
        payload: getCharCount(editorState)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle updating editor state changes.
  const handleChange = (newEditorState) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: newEditorState
    });

    const newCharCount = getCharCount(newEditorState);

    // Export new HTML on every change.
    if (typeof onExport === 'function') {
      onExport({
        count: {
          characters: newCharCount
        },
        html: stateToHTML(newEditorState.getCurrentContent(), {
          entityStyleFn: (entity) => {
            // Add _blank to all links.
            const entityType = entity.get('type').toLowerCase();
            if (entityType === 'link') {
              const data = entity.getData();
              return {
                element: 'a',
                attributes: {
                  href: data.url,
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              };
            }
            return entity;
          }
        })
      });
    }
    
    // Handle updating count if limit is set.
    if (typeof limit === 'number') {
      dispatch({
        type: 'UPDATE_COUNT',
        payload: newCharCount
      });
    }
  };

  // Handle formatting commands.
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  // Placeholder behaviour.
  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const firstType = contentState
      .getBlockMap()
      .first()
      .getType();

    // The default draft.js placeholder behaviour doesn't mimic a normal input
    // So we have to manually hide it. This check hides it if there's no text or
    // the first item is unstyled (in case they start with a list).
    if (!contentState.hasText() && firstType === 'unstyled') {
      dispatch({
        type: 'TOGGLE_PLACEHOLDER',
        payload: true
      });
    } else {
      dispatch({
        type: 'TOGGLE_PLACEHOLDER',
        payload: false
      });
    }
  }, [editorState, showPlaceholder]);

  // Toggles block selections e.g. headings.
  const toggleBlockType = (blockType) => {
    handleChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
    setTimeout(() => editorEl.current.focus(), 0);
  };

  // Toggles inline selections e.g. bold.
  const toggleInlineStyle = (inlineStyle) => {
    handleChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  if (!isBrowser) {
    return null;
  }

  return (
    <div>
      <Wrapper
        className='salo-editor'
        showControls={ showControls }
        ref={ wrapperEl }
      >
        <Controls hide={ !showControls }>
          { showURLInput && (
            <UrlInput
              dispatch={ dispatch }
              editorEl={ editorEl }
              editorState={ editorState }
              urlInput={ urlInput }
              urlValue={ urlValue }
            />
          ) }
          { !showURLInput && (
            <React.Fragment>
              <InlineStyleControls
                editorState={ editorState }
                onToggle={ toggleInlineStyle }
              />
              <LinkControls
                editorState={ editorState }
                dispatch={ dispatch }
                urlInput={ urlInput }
              />
              <BlockStyleControls
                editorState={ editorState }
                onToggle={ toggleBlockType }
              />
            </React.Fragment>
          ) }
        </Controls>
        <div
          className={ `salo-editor__editor ${ !showPlaceholder ? 'hide-placeholder' : '' } ${ className }` }
        >
          <Editor
            editorState={ editorState }
            onChange={ handleChange }
            handleKeyCommand={ handleKeyCommand }
            placeholder={ placeholder }
            blockStyleFn={ getBlockStyle }
            customStyleMap={ {
              ...defaultStyleMap,
              ...styleMap
            } }
            spellCheck={ true }
            ref={ editorEl }
            onBlur={ (event) => {
              if (!wrapperEl.current.contains(event.relatedTarget)) {
                dispatch({
                  type: 'TOGGLE_CONTROLS',
                  payload: false
                });
              }
            } }
            onFocus={ () => {
              dispatch({
                type: 'TOGGLE_CONTROLS',
                payload: true
              });
            } }
          />
          { !!limit && (
            <CharacterCount
              editorState={ editorState }
              limit={ limit }
              count={ count }
            />
          ) }
        </div>
      </Wrapper>
    </div>
  );
};

WYSIWYG.defaultProps = {
  className: '',
  placeholder: '',
  value: '',
  onExport: null,
  limit: null,
  styleMap: null
};

WYSIWYG.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number,
  onExport: PropTypes.func,
  placeholder: PropTypes.string,
  styleMap: PropTypes.object,
  value: PropTypes.string
};

export default WYSIWYG;