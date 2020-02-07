import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
  background-color: ${ ({ theme }) => theme.grey };
  color: #000;
  font-size: 1.5rem;
  line-height: 1.2;
  min-height: 18rem;
  padding: 7rem 3rem 3rem;
  border: 1px solid #E9EAED;

  .public-DraftEditorPlaceholder-inner {
    position: absolute;
    color: rgba(0,0,0,0.5);
    pointer-events: none;
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
  transform: translate(-50%, 50%);
  width: 35rem;
  padding: 1rem 0 0.5rem;
  border-radius: 2rem;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);

  display: flex;
  align-items: center;
`;

export const Format = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  color: ${ ({ isActive }) => (isActive ? '#ccc' : '') };
  cursor: pointer;
  
  path {
    fill: ${ ({ isActive }) => (isActive ? '#ccc' : '') };
  }
`;

export const Dropdown = styled.select`
  font-size: 1.5rem;
  line-height: 1.2;
  border: 0;
  margin: 0;
  background: none;
  appearance: none;
  position: relative;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  padding-right: 3rem;
  margin: 0 1rem;

  svg {
    top: -0.25rem;
    position: absolute;
  }
`;