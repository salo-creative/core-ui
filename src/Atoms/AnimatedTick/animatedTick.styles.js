
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 40px;
  width: 100%;
`;

export const Path = styled.path`
  fill: none;
  stroke: ${ ({ theme }) => theme.success };
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  opacity: 0;
  stroke-dasharray: 130;
  stroke-dashoffset: 130;
  transition: all 1s;
  .active & {
    opacity: 1;
    stroke-dashoffset: 0;
  }
`;

export const PolyLine = styled.polyline`
  fill: none;
  stroke: ${ ({ theme }) => theme.success };
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  transition: stroke-dashoffset 1s 0.5s ease-out;
  .active & {
    stroke-dashoffset: 0;
  }
`;