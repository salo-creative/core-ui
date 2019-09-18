import styled from 'styled-components';
import { get } from 'lodash';
import { transparentize } from 'polished';

// Container
export const Wrapper = styled.div`
  margin: ${ ({ margin }) => margin };
`;

// Label
export const CheckBoxLabel = styled.label`
  align-items: center;
  color: ${ ({ theme }) => theme.primary };
  cursor: ${ ({ disabled }) => (disabled ? 'not-allowed' : 'pointer') };
  display: flex;
  font-size: ${ ({ size }) => (size === 'L' ? '1.6rem' : '1.4rem') };
  height: ${ ({ size }) => (size === 'L' ? '2.6rem' : '2.1rem') };
  margin: ${ ({ margin }) => margin };
  opacity: ${ ({ disabled }) => (disabled ? 0.75 : 1) };
  width: fit-content;
`;

// Hidden true input field for accessibility
export const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
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
  background-color: ${ ({ colours, checked, theme }) => {
    if (get(colours, 'checked.background')) {
      return checked ? colours.checked.background : colours.unchecked.background;
    }
    return checked ? theme.primary : theme.paleGrey;
  } };
  border-radius: ${ ({ borderRadius }) => borderRadius };
  border: ${ ({ colours, theme, checked }) => {
    if (get(colours, 'checked.border')) {
      return `.1rem solid ${ checked ? colours.checked.border : colours.unchecked.border }`;
    }
    return (checked ? `.1rem ${ theme.primary } solid` : `.1rem ${ theme.darkGrey } solid`);
  } };
  height: ${ ({ width }) => width };
  margin-right: 1rem;
  transition: all 150ms;
  box-shadow: ${ ({ shadow }) => shadow };
  width: ${ ({ width }) => width };

  svg {
    fill: none;
    stroke: ${ ({ colours, checked }) => {
    if (get(colours, 'checked.check')) {
      return checked ? colours.checked.check : colours.unchecked.check;
    }
    return '#fff';
  } };
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