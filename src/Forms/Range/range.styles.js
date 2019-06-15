import styled, { css } from 'styled-components';

export const RangeSliderOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${ ({ margin }) => margin };
`;

export const RangeSliderInnerWrapper = styled.div`
  display: flex;
  height: ${ ({ height }) => height };
  position: relative;
  align-items: center;
`;

export const ValWrapper = styled.div`
  margin: ${ ({ margin }) => margin };
  color: ${ ({ theme }) => theme.font };
  display: flex;
  align-items: center;
  width: 4rem;
`;

const thumbPartial = css`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background: ${ ({ theme }) => theme.primary };
  cursor: pointer;
  margin-top: -.8rem;
  z-index: 10000;
`;

const trackPartial = css`
  width: 100%;
  height: .4rem;
  cursor: pointer;
  background: ${ ({ theme }) => theme.grey };
  border-radius: 1.3px;
`;

const focusPartial = css`
  
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  } 
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${ thumbPartial }
  }
  &::-moz-range-thumb {
    ${ thumbPartial }
  }
  &::-ms-thumb {
    ${ thumbPartial }
  }
  &::-webkit-slider-runnable-track {
    ${ trackPartial }
  }
  &:focus::-webkit-slider-runnable-track {
    ${ focusPartial }
  }
  &::-moz-range-track {
      ${ trackPartial }
  }
  &::-ms-track {
    width: 100%;
    height: .4rem;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    ${ trackPartial }
  }
  &:focus::-ms-fill-lower {
    ${ trackPartial }
  }
  &::-ms-fill-upper {
    ${ trackPartial }
  }
  &:focus::-ms-fill-upper {
    ${ focusPartial }
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.75;
  }
`;

export const ValueDisplay = styled.div`
  background-color: ${ ({ theme }) => theme.grey };
  height: ${ ({ size }) => size };
  width: ${ ({ size }) => size };
  border-radius: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-left: 1rem;
`;