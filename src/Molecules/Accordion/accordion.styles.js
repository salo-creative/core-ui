import styled from 'styled-components';
import Icon from '@salo/icons';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.button`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  background-color: ${ ({ theme }) => theme.paleGrey };
  transition: background-color 0.2s linear;
  border-bottom: 1px solid ${ ({ theme }) => theme.grey };
  cursor: pointer;
  height: 5rem;
  width: 100%;
  text-align: left;
  padding: 0 1rem;
`;

export const Body = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1rem;
`;

export const Label = styled.p`
  margin: 0 1rem;
  font-size: 1.4rem;
  width: 100%;
`;

export const Chevron = styled.span`
  display: flex;
  transition: transform 0.3s linear;
  transform: ${ ({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)') };
`;