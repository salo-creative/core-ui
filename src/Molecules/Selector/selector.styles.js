import styled from 'styled-components';
import { transparentize } from 'polished';

export const Label = styled.button`
 position: relative;
  margin: 0;
  width: 100%;
  outline: none;
  width: 100%;
  height: ${ ({ size }) => (size === 'L' ? '4.5rem' : '4rem') };
  border-radius: 0.4rem;
  background: transparent;
  color: ${ ({ color }) => color };
  font-size: ${ ({ size }) => (size === 'L' ? '1.6rem' : '1.4rem') };
  padding: 0 4rem 0 1rem;
  border: 1px solid ${ ({ theme }) => transparentize(0.5, theme.primary) };
  margin: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:focus,
  &:active {
    border: 1px solid ${ ({ theme }) => theme.primary };
  }
  &.noValue {
    color: ${ ({ theme }) => theme.darkGrey };
  }
  &:after {
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

export const IconAfter = styled.span`
  display: flex;
  width: 40px;
  height: calc(100% - 10px);
  align-items: center;
  right: 0;
  top: 5px;
  position: absolute;
  justify-content: center;
  border-left: 1px solid ${ ({ theme }) => transparentize(0.5, theme.primary) };
  svg {
    fill: ${ ({ theme }) => theme.darkGrey };
  }
`;