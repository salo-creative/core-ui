import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const Item = styled.button`
  border: none;
  background: none;
  outline: none;
  color: ${ ({ theme }) => theme.black };
  transition: all 0.3s linear;
  display: flex;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  font-size: 1.1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  margin: 0 0.25rem 0;
  &.active {
    color: #fff;
    background: ${ ({ theme }) => theme.blue };
  }
  &:hover {
    &:not(.active):not([disabled]) {
      background: ${ ({ theme }) => theme.grey };
    }
  }
  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const Ellipsis = styled.span`
  height: 3rem;
  flex-shrink: 0;
  display: flex;  
  align-items: center;
  justify-content: center;
`;