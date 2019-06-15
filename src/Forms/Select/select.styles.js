import styled from 'styled-components';
import { transparentize } from 'polished';

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  width: 100%;
  background: ${ ({ background }) => background };
`;

export const OuterSelectWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  margin: ${ ({ margin }) => margin };
`;

export const Selector = styled.select`
  width: 100%;
  height: ${ ({ height }) => height };
  background: transparent;
  color: ${ ({ theme }) => theme.font };
  font-size: inherit;
  padding: 0 4rem 0 1rem;
  border: 1px solid ${ ({ theme }) => transparentize(0.5, theme.primary) };
  margin: 0;
  border-radius: 0;
  text-overflow: '';
  appearance: none;
  outline: none !important;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  transition: border 0.2s linear;
  position: relative;
  z-index: 2;
  &:focus,
  &:active {
    border-color: ${ ({ theme }) => theme.primary };
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.75;
  }
  ${ ({ border }) => (border === 'false' ? `
    border-color: transparent !important;
    padding: 0 4rem 0 0;
  ` : '') }
`;

export const IconAfter = styled.span`
  display: flex;
  width: 4rem;
  height: calc(100% - 1.5rem);
  align-items: center;
  right: 0;
  top: 0.75rem;
  position: absolute;
  justify-content: center;
  border-left: 1px solid ${ ({ theme }) => transparentize(0.5, theme.primary) };
  z-index: 1;
`;

// TITLE PICKER
export const TitleWrapper = styled.div`
  width: 100%;
  position: relative;
  &.loading,
  &.error {
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: rgba(255,255,255,0.9);
    }
  }
`;

export const RetryWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
`;

export const Text = styled.span`
  margin-left: 1rem;
`;