import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  .public-DraftEditorPlaceholder-inner {
    position: absolute;
    color: rgba(0,0,0,0.5);
    pointer-events: none;
  }

  .public-DraftEditor-content {
    min-height: 13rem;
    padding: 1rem;
    background-color: ${ ({ theme }) => theme.paleGrey };
    color: #000;
    font-size: 1.5rem;
    line-height: 1.2;
    min-height: 18rem;
    padding: ${ ({ showControls }) => (showControls ? '7rem 3rem 3rem' : '3rem') };
    border: 1px solid #E9EAED;
    transition: padding 0.5s ease-in;
  }

  .RichEditor-blockquote {
    border-left: 3px solid;
    padding-left: 1rem;
    margin-left: 0;
  }

  .hide-placeholder .public-DraftEditorPlaceholder-inner {
    display: none;
    background: red;
  }
`;

export const Controls = styled.div`
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: -1rem;
  transform: translate(-50%, -150%);
  width: 32rem;
  padding: 0 1rem;
  height: 4.5rem;
  border-radius: 2rem;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  opacity: 0;
  transition: all 0.5s ease-in;

  ${ ({ hide }) => {
    if (!hide) {
      return css`
        opacity: 1;
        transform: translate(-50%, 50%);

      `;
    }
    return '';
  } }
`;

export const Format = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0 1rem;
  height: 4.5rem;
  color: ${ ({ isActive }) => (isActive ? '#ccc' : '') };
  cursor: pointer;

  &:disabled {
    path {
      fill: ${ ({ theme }) => theme.grey };
    }
  }
  
  path {
    transition: fill 0.15s ease-in;
    fill: ${ ({ isActive }) => (isActive ? '#ccc' : '') };
  }
`;

export const LinkButton = styled.button`
  appearance: none;
  background-color: ${ ({ theme }) => theme.darkGrey };
  border: 0;
  border-radius: 2rem;
  padding: 0;
  height: ${ ({ xSize }) => xSize || '3rem' };
  width: ${ ({ xSize }) => xSize || '3rem' };
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in;

  &:hover {
    background-color: ${ ({ theme, hoverColour }) => (theme[hoverColour] ? theme[hoverColour] : '') };
  }

  &:disabled {
    background-color: ${ ({ theme }) => theme.grey };
  }
  
  & + & {
    margin-left: 1rem;
  }
`;

export const Dropdown = styled.select`
  font-size: 1.5rem;
  line-height: 1.2;
  height: 4.5rem;
  border: 0;
  margin: 0;
  background: none;
  appearance: none;
  position: relative;
  width: 100%;
  cursor: pointer;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  margin: 0 1rem;
  width: 13rem;

  svg {
    position: absolute;
    top: 1rem;
    right: 0;
    pointer-events: none;
  }
`;

export const URLInput = styled.input`
  color: ${ ({ theme }) => theme.darkGrey };
  background-color: ${ ({ theme }) => theme.grey };
  margin: 0 1rem;
  flex: 1;
  border: 0;
  font-size: 1.4rem;
  padding: 0 1rem;
  height: 3.5rem;
  border-radius: 2rem;
`;