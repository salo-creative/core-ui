import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin: 0 0rem 3rem;
  &:before {
    content: '';
    height: 1px;
    left: 0;
    top: 50%;
    position: absolute;
    width: 100%;
    z-index: 1;
    transform: translateY(-50%);
    background: ${ ({ theme }) => theme.grey };
  }
`;

export const NavItem = styled.button`
  transition: all 0.3s linear;
  display: flex;
  border: none;
  background: none;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background: #fff;
  cursor: pointer;
  position: relative;
  z-index: 2;
  color: ${ ({ theme }) => theme.font };
  &:before {
    transition: all 0.3s linear;
    content: '';
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    background: ${ ({ theme }) => theme.grey };
  }
  &[disabled] {
    color: ${ ({ theme }) => transparentize(0.25, theme.grey) };
    cursor: not-allowed;
    &:before {
      background: ${ ({ theme }) => transparentize(0.25, theme.grey) };
    }
  }
  &.active,
  &.complete {
    &:before {
      background: ${ ({ theme }) => theme.primary };
    }
  }
`;

export const StepWrapper = styled.div`
    width: 100%;
`;