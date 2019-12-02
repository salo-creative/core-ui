import styled from 'styled-components';
import { transparentize } from 'polished';

export const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${ ({ size }) => (size === 'L' ? '4rem' : '4rem') };
  margin: ${ ({ margin }) => margin };
  position: relative;
  opacity: 1;
  ${ ({ width }) => (width ? `width: ${ width };` : '') }
  ${ ({ justify }) => (justify ? `justify-content: ${ justify };` : '') }
  ${ ({ disabled }) => (disabled ? `
    cursor: not-allowed;
    opacity: 0.75;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  ` : 'cursor: pointer;') }
  &.alignLeft {
    flex-direction: row-reverse;
  }
`;

export const SwitchContainer = styled.button`
  display: flex;
  width: 5rem;
  height: ${ ({ size }) => (size === 'L' ? '2rem' : '1.5rem') };
  position: relative;
  border-radius: 0.4rem;
  background: ${ ({ active, theme }) => (active ? transparentize(0.7, theme.success) : theme.grey) };
  cursor: pointer;
  margin: 0 1rem 0 0;
  border: none;
  outline: none;
  .alignLeft & {
    margin: 0 0 0 1rem;
  }
`;

export const SwitchHandle = styled.span`
  top: -0.5rem;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  border: 0.2rem solid #fff;
  background: ${ ({ active, theme }) => (active ? theme.success : theme.darkGrey) };
  transition: ${ ({ hasTransition }) => hasTransition };
  ${ ({ size, active }) => (size === 'L' ? `
    height: 3rem;
    width: 3rem;
    left: ${ (active ? '2rem' : 0) };
  ` : `
    height: 2.5rem;
    width: 2.5rem;
    left: ${ (active ? '2.5rem' : 0) };
  `) }
`;

export const SwitchLabel = styled.span`
  color: ${ ({ theme }) => theme.darkGrey };
  font-size: ${ ({ size }) => (size === 'L' ? '1.6rem' : '1.4rem') };
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: -0.5rem;
  ${ ({ size, active }) => (size === 'L' ? `
    top: -0.25rem;
    left: ${ (active ? '2.25rem' : '0.25rem') };
  ` : `
    top: -0.5rem;
    left: ${ (active ? '2.5rem' : 0) };
  `) }
`;