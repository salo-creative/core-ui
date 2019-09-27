import styled from 'styled-components';

export const TabButton = styled.button`
  appearance: none;
  border-radius: 5px 5px 0 0;
  border: 0;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 15px 30px;
  position: relative;

  /* Specific styles if selected */
  ${ (props) => {
    if (props['aria-selected']) {
      return `
        background-color: ${ props.theme.paleGrey };
        box-shadow: 0px -1px 1px 0px ${ props.theme.grey };
      `;
    }
    return '';
  } }

  &:focus {
    box-shadow: 0px -2px 2px 0px ${ ({ theme }) => theme.grey };
  }

  &:active {
    top: 1px;
  }
`;

export const Pane = styled.div`
  background-color: ${ ({ theme }) => theme.paleGrey };
  border-radius: 0 0 5px 5px;
  box-shadow: 1px 2px 1px 0px ${ ({ theme }) => theme.grey };
  padding: 30px;
`;