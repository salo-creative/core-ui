import styled from 'styled-components';
import { transparentize } from 'polished';

export const MultiSelectWrapper = styled.div`
  width: 100%;
  margin: ${ ({ margin }) => margin };
  label {
    display: block;
  }
`;

export const MultiSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MultiSelectButton = styled.div`
  button {
    margin: 0;
    padding: ${ ({ padding }) => padding };
    height: ${ ({ height }) => height };
    background-color: ${ ({ background, error, theme }) => (error ? transparentize(0.7, theme.error) : background) } !important;
    border: ${ ({ border }) => border };
    border-color: ${ ({ theme, error }) => (error ? transparentize(0.3, theme.error) : transparentize(0.5, theme.primary)) } !important;
    transition: border 0.2s linear;
    width: 100%;
    border-radius: ${ ({ borderRadius }) => borderRadius };
    font-size: ${ ({ fontSize }) => fontSize };
    text-transform: none;
    box-shadow: none;
    justify-content: space-between;
    letter-spacing: initial;
    color: ${ ({ theme }) => theme.font } !important;
    &[disabled] {
      cursor:  not-allowed;
      opacity: 0.75;
      background-color: ${ ({ background, error, theme }) => (error ? transparentize(0.7, theme.error) : background) } !important;
      border-color: ${ ({ theme, error }) => (error ? transparentize(0.3, theme.error) : transparentize(0.5, theme.primary)) } !important;
    }
    svg {
      flex-shrink: 0;
      path {
        fill: ${ ({ theme }) => theme.font } !important;
      }
    }
    &:hover:not([disabled]) {
      svg path {
      fill: ${ ({ theme }) => theme.font } !important;
    }
    }
  }
`;

export const MultiSelectPlaceholder = styled.span`
  color: ${ ({ theme }) => theme.darkGrey };
`;

export const MultiSelectText = styled.span`
  overflow-x: auto;
  white-space: nowrap;
  display: inherit;
`;

export const MultiSelectDrop = styled.div`
  opacity: ${ ({ state }) => (state === 'entered' ? 1 : 0) };
  transition: opacity 200ms cubic-bezier(0.470, 0.000, 0.745, 0.715);
  z-index: 5;
  position: absolute;
  background: #fff;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);
  top: 0.5rem;
  left: 0.5rem;
  width: calc(100% - 1rem);
  height: ${ ({ height }) => height };
  padding: 0;
  overflow-y: scroll;
`;

export const MultiSelectOption = styled.button`
  border: none;
  background: none;
  border-bottom: 1px solid ${ ({ theme }) => theme.grey };
  display: flex;
  width: 100%;
  height: 4rem;
  padding: 0 2rem; 
  align-items: center;
  cursor: pointer;
  span {
    overflow: hidden;
    white-space: nowrap;
    display: inherit;
  }
`;

export const MultiSelectCheck = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  margin: 0 1.5rem 0 0;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: none;
    stroke: #fff;
    stroke-width: 2px;
    visibility: visible;
  }
  .active & {
    background: #000;
  }
`;

export const MultiSelectErrorText = styled.p`
  padding: 2rem;
  margin: 0;
  font-size: 1.4rem;
  color: ${ ({ theme }) => theme.error };
`;

export const MultiSelectFooterControls = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MultiSelectFooterButton = styled.button`
  appearance: none;
  border: none;
  background: none;
  height: 4rem;
  padding: 0 1rem;
  text-transform: uppercase;
  cursor: pointer;
`;