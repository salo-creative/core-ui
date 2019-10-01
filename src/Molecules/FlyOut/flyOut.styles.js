import styled from 'styled-components';

export const Container = styled.div`
  z-index: 5;
  background: none;
  &:before {
    content: '';
    display: block;
    height: 0;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  &.is-active:before {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.98);
    &:not(.table) {
      height: calc(100% + 0.3rem);
    }
  }
  &:not(.card) {
    width: 100%;
    height: 100%;
  }
  /* Contexts */
  &.card {
    display: flex;
    justify-content: flex-end;
  }
  &.table--card {
    display: flex;
    justify-content: flex-end;
  }
  &.float,
  &.float-horizontal {
    position: relative;
  }
  &.table {
    align-items: center;
    display: flex;
  }
`;

export const Actions = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  visibility: hidden;
  justify-content: flex-end;

  .is-active & {
    visibility: visible;
  }

  /* Contexts */
  .card & {
    flex-direction: column;
    right: 0;
    bottom: 6rem;
    left: 0;
    padding: 0 0 0.5rem;
    width: calc(100% - 6rem);
    text-align: right;
  }

  .table & {
    flex-direction: row;
    right: 6rem;
    width: calc(100% - 6rem);
    padding: 0 1rem 0 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
  }

  .table--card & {
    flex-direction: column;
    right: 0;
    bottom: 4rem;
    left: 0;
    padding: 0 0 1rem;
    text-align: right;
  }

  .float & {
    flex-direction: row;
    justify-content: flex-start;
    left: 6.5rem;
    width: calc(100% - 6.5rem);
    top: 50%;
    transform: translateY(-50%);
    text-align: left;
  }

  .float-horizontal & {
    flex-direction: column;
    justify-content: inherit;
    left: 0;
    right: 0;
    text-align: right;
    top: 100%;
  }
`;

export const Wrapper = styled.div`
  display: inline-block;
  .card & {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

export const Toggle = styled.button`
  cursor: pointer;
  display: flex;
  outline: none;
  border-radius: 50%;
  background: inherit;
  height: 4rem;
  width: 4rem;
  overflow: hidden;
  border: none;
  transform: rotate(90deg);
  transition: all 0.3s linear;
  &:focus,
  &:active {
    outline: none;
  }
  .is-active & {
    transition: transform 250ms;
    transform: rotate(0);
  }
  .inverse & {
    background: transparent;
    &:hover {
      background: ${ ({ theme }) => theme.grey };
    }
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  transform: scale(0);
  transition-duration: .1s;
  .is-active & {
    transform: scale(1);
    transition-duration: .3s;
  }

  /* Contexts */
  .card & {
    padding-top: 0.5rem;
    padding-left: 0;
    padding-bottom: 0.5rem;
    padding-right: 0;
  }
  .table & {
    padding-top: 0;
    padding-bottom: 0;
  }
  .table--card & {
    padding-left: 0;
    padding-right: 0;
  }
  .float & {
    padding-top: 0;
    padding-bottom: 0;
  }
  .float-horizontal & {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ItemButton = styled.button`
  text-decoration: none;
  display: flex;
  align-items: center;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  margin: 0;
  padding: 1rem;
  color: inherit;
  &:focus,
  &:active {
    outline: none;
  }
  .table & {
    flex-direction: row-reverse;
  }
`;

export const Title = styled.span`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
  color: inherit;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4rem;
  background: #fff;
  height: 4rem;
  width: 4rem;
  border: 0.1rem solid inherit;
  display: flex;
  margin-left: 1rem;
  box-sizing: border-box;
  svg path {
    fill: inherit;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    height: 4rem;
    border-radius: 4rem;
    width: 4rem;
  }
  .table & {
    margin-left: 0;
    margin-right: 1rem;
  }
`;