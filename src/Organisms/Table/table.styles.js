import styled, { css } from 'styled-components';

import { Skeleton } from './table.skeleton.styles';

export const TableWrapper = styled(Skeleton)`
  width: ${ ({ width }) => width };
`;

// BODY
export const BodyWrapper = styled.div.attrs({
  className: 'salo-table__body-wrapper'
})`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// ROW
export const BodyRow = styled.div
  .attrs(({ isCard }) => ({
    className: `salo-table__body-row ${ isCard ? 'salo-table__body-row--card' : '' }`
  }))`
  position: relative;
  display: flex;
  width: 100%;
  flex-wrap: none;
  border-bottom: 1px solid ${ ({ theme }) => theme.grey };
  
  .no-borders & {
    border-bottom: none;
  }

  ${ ({ isCard, height }) => {
    if (isCard) {
      return css`
        flex-direction: column;
      `;
    }
    return css`
      height: ${ height };
    `;
  } }
`;

export const BodyCell = styled.div`
  padding: ${ ({ borders, isCard }) => (!borders && isCard ? '1rem 0' : '1rem') };
  display: ${ ({ isCard }) => (isCard ? 'block' : 'flex') };
  align-items: center;
  font-size: 1.4rem;
  flex-basis: ${ ({ flexBasis }) => flexBasis };
  flex-grow: 1;
  min-width: ${ ({ minWidth }) => minWidth };

  &:first-child {
    padding-left: ${ ({ borders, isCard }) => (borders && !isCard ? '1rem' : '0') };
  }
  &:last-child {
    padding-right: ${ ({ borders, isCard }) => (borders && !isCard ? '1rem' : '0') };
  }
`;

export const ActionCell = styled(BodyCell).attrs({
  className: 'salo-table__action-cell'
})`
  padding: 0 1rem 0 3rem;
  min-width: ${ ({ width }) => width };
  flex-basis: ${ ({ width }) => width };

  &:last-child {
    padding-right: ${ ({ borders, isCard }) => (borders && !isCard ? '1rem' : '0') };
  }
`;

export const BodyCellHeading = styled.h4.attrs({
  className: 'salo-table__body-heading'
})`
  margin-top: 0;
`;

export const BodyCellValue = styled.span.attrs({
  className: 'salo-table__body-value'
})``;

// HEADER
export const HeaderRow = styled.div.attrs({
  className: 'salo-table__header-row'
})`
  display: ${ ({ isCard }) => (isCard ? 'none' : 'flex') };
  width: 100%;
  height: 5rem;
  flex-wrap: none;
  border-bottom: 2px solid ${ ({ theme }) => theme.grey };
  position: relative;

  .no-borders & {
    border-bottom: none;
  }
`;

export const HeaderCell = styled.div.attrs({
  className: 'salo-table__header-cell'
})`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  flex-basis: ${ ({ flexBasis }) => flexBasis };
  flex-grow: 1;
  min-width: ${ ({ minWidth }) => minWidth };

  &:first-child {
    padding-left: ${ ({ borders, isCard }) => (borders && !isCard ? '1rem' : '0') };
  }
  &:last-child {
    padding-right: ${ ({ borders, isCard }) => (borders && !isCard ? '1rem' : '0') };
  }
`;

export const HeaderSorting = styled.div.attrs({
  className: 'salo-table__header-sorting'
})`
  margin-left: 1rem;
`;

// NO DATA
export const NoData = styled.div.attrs({
  className: 'salo-table__no-data'
})`
  display: flex;
  width: 100%;
  height: 5rem;
  align-items: center;
  font-size: 1.6rem;
  justify-content: center;
  &.error {
    color: ${ ({ theme }) => theme.error };
  }
`;

// ERROR MESSAGE
export const ErrorMessage = styled.div.attrs({
  className: 'salo-table__error'
})`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  align-items: center;
  font-size: 1.6rem;
  justify-content: center;
  .error {
    color: ${ ({ theme }) => theme.error };
  }
`;

// PAGINATION
export const LoadMoreWrapper = styled.div.attrs({
  className: 'salo-table__loadmore-wrapper'
})`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2rem 0;
`;