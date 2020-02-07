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
    display: none
  }

`;

export const Controls = styled.div`
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 1rem;
  transform: translate(-50%, 50%);
  width: 35rem;
  padding: 1rem;
  border-radius: 2rem;
	box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);
  
  display: flex;
  align-items: center;
`;