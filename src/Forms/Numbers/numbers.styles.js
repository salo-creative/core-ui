import styled from 'styled-components';
import Row from '../../Atoms/Row';
import Column from '../../Atoms/Column';
import P from '../../Typography/P';

export const Wrapper = styled.div`
  position: relative;
  margin: ${ ({ margin }) => margin };
  ${ ({ disabled }) => (disabled ? (
    `cursor: not-allowed;
    opacity: 0.75;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      z-index: 5;
    }`
  ) : '') }
`;

export const AddButton = styled.button`
  right: 0;
  top: 0;
  padding: 0;
  height: 2rem;
  width: 10rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  font-size: 1.2rem;
  color: ${ ({ theme }) => theme.darkGrey };
  cursor: pointer;
  transition: all 0.3s linear;
  path {
    fill: ${ ({ theme }) => theme.darkGrey };
    transition: all 0.3s linear;
  }
  &:hover {
    color: ${ ({ theme }) => theme.blue };
  path {
    fill: ${ ({ theme }) => theme.blue };
  }
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  padding-top: 0.5rem;
  border-bottom: 1px solid ${ ({ theme }) => theme.grey };
`;

export const EntryWrapper = styled(Row)`
  position: relative;
`;

export const EntryColumn = styled(Column)`
  border-bottom: 1px solid ${ ({ theme }) => theme.grey };
`;

export const ReadOnly = styled(P)`
  height: 4rem;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  strong {
    margin-right: 2rem;
    text-transform: capitalize;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;