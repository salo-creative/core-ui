import styled from 'styled-components';

export const AlertWrapper = styled.div`
  width: 100%;
  background: ${ ({ theme }) => theme.success };
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  text-align: left;
  min-height: 5rem;
  display: flex;
  align-items: center;
  position: relative;
  &.error {
    background: ${ ({ theme }) => theme.error };
  }
  &.warning {
    background: ${ ({ theme }) => theme.yellow };
  }
  &.info {
    background: ${ ({ theme }) => theme.primary };
  }
`;

export const Close = styled.a`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  width: 3rem;
  height: 100%;
  opacity: 0.6;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.3s linear;
  &:hover {
    opacity: 1;
  }
`;