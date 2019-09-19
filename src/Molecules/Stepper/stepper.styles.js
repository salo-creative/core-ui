import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: ${ ({ stepperType }) => (stepperType === 'full' ? 'space-between' : 'start') };
  margin: ${ ({ stepperType }) => (stepperType === 'full' ? '0 0 3rem' : '3rem 0 0') };
  position: relative;
  width: 100%;

  &:before {
    content: ${ ({ stepperType }) => (stepperType === 'full' ? '""' : null) };
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
  align-items: center;
  background: #fff;
  background: none;
  border: none;
  color: ${ ({ theme }) => theme.font };
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.3s linear;
  z-index: 2;
  &:before {
    background: ${ ({ theme }) => theme.grey };
    border-radius: 50%;
    content: '';
    display: flex;
    height: 1.5rem;
    margin-right: 0.5rem;
    transition: all 0.3s linear;
    width: 1.5rem;
  }
  &[disabled] {
    color: ${ ({ theme }) => transparentize(0.25, theme.grey) };
    cursor: not-allowed;
    &:before {
      background: ${ ({ theme }) => transparentize(0.25, theme.grey) };
    }
  }
  &.active {
    &:before {
      background: ${ ({ theme }) => theme.primary };
      height: 2.5rem;
      width: 2.5rem;
    }
  }
  &.complete {
    &:before {
      background: ${ ({ theme }) => theme.darkGrey };
    }
  }
  &.error {
    &:before {
      background: ${ ({ theme }) => theme.error };
    }
  }
`;

export const StepWrapper = styled.div`
    width: 100%;
`;