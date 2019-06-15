import styled from 'styled-components';
import { transparentize } from 'polished';

// Container
export const Wrapper = styled.div`
  margin: ${ ({ margin }) => margin };
`;

// Label
export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  height: ${ ({ size }) => (size === 'L' ? '2.6rem' : '2.1rem') };
  font-size: ${ ({ size }) => (size === 'L' ? '1.6rem' : '1.4rem') };
  width: fit-content;
  margin: ${ ({ margin }) => margin };
  opacity: ${ ({ disabled }) => (disabled ? 0.75 : 1) };
  cursor: ${ ({ disabled }) => (disabled ? 'not-allowed' : 'pointer') };
`;

// Hidden true input field for accessibility
export const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

// Styled check mark
export const StyledCheckBox = styled.div`
  width: ${ ({ width }) => width };
  height: ${ ({ width }) => width };
  background-color: ${ ({ checked, theme }) => (checked ? theme.primary : theme.paleGrey) };
  border: ${ ({ theme, checked }) => (checked ? `.1rem ${ theme.primary } solid` : `.1rem ${ theme.darkGrey } solid`) };
  border-radius: ${ ({ borderRadius }) => borderRadius };
  transition: all 150ms;
  margin-right: 1rem;
  svg {
    fill: none;
    stroke: white;
    stroke-width: 2px;
    visibility: ${ ({ checked }) => (checked ? 'visible' : 'hidden') }
  }
`;

export const CheckMark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

// Grouped checkboxes
export const Group = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  margin: ${ ({ margin }) => margin };
`;

export const GroupWrapper = styled.div`
  padding: 1rem;
  background: ${ ({ theme }) => theme.paleGrey };
  border: 0.1rem solid;
  border-color: ${ ({ theme }) => transparentize(0.5, theme.primary) };
  border-radius: 0.4rem;
`;