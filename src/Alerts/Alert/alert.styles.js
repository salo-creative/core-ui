import styled, { keyframes, css } from 'styled-components';

const loadSwipe = keyframes`
  from {
    width: 0
  }
  to {
    width: 100%
  }
`;

const animation = ({ time }) => css`
  ${ loadSwipe } ${ time }s linear infinite;
`;

export const AlertWrapper = styled.div`
  width: 100%;
  background: ${ ({ theme }) => theme.green };
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  text-align: left;
  min-height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  &.error {
    background: ${ ({ theme }) => theme.red };
  }
  &.warning {
    background: ${ ({ theme }) => theme.yellow };
  }
  &.info {
    background: ${ ({ theme }) => theme.blue };
  }
  ${ ({ timer }) => (timer ? `
    &:after {
      display: block;
      content: "";
      width: 100%;
      left: 0;
      top: 0;
      position: absolute;
      height: 0.4em;
      background: rgba(255,255,255,0.3);
      animation-fill-mode: both;
      animation: ${ animation };
    }
  ` : '') };
`;

export const Close = styled.a`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  width: 30px;
  height: 100%;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.3s linear;
  &:hover {
    opacity: 1;
  }
`;