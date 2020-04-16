import styled, { css } from 'styled-components';

export const TableWrapper = styled.div`
  width: ${ ({ width }) => width };
`;

// BODY
export const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// ROW
export const BodyRow = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-wrap: none;
  border-bottom: 1px solid ${ ({ theme }) => theme.grey };

  ${ (props) => {
    if (props.isCard) {
      return css`
        flex-direction: column;
      `;
    }
    return css`
      height: ${ props.height };
    `;
  } }

  .no-borders & {
    border-bottom: none;
  }
`;

export const BodyCell = styled.div`
  padding: 1rem;
  display: ${ ({ isCard }) => (isCard ? 'block' : 'flex') };
  align-items: center;
  font-size: 1.4rem;
  flex-basis: ${ ({ flexBasis }) => flexBasis };
  flex-grow: 1;
  min-width: ${ ({ minWidth }) => minWidth };
`;

export const ActionCell = styled(BodyCell)`
  padding: 0 1rem 0 3rem;
  min-width: ${ ({ width }) => width };
  flex-basis: ${ ({ width }) => width };
`;

// HEADER
export const HeaderRow = styled.div`
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

export const HeaderCell = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  flex-basis: ${ ({ flexBasis }) => flexBasis };
  flex-grow: 1;
  min-width: ${ ({ minWidth }) => minWidth };
`;

export const HeaderSorting = styled.div`
  margin-left: 1rem;
`;

// LOADER
export const LoaderWrapper = styled.div`
  padding: 3rem 0;
`;

// NO DATA
export const NoData = styled.div`
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
export const ErrorMessage = styled.div`
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
export const LoadMoreWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2rem 0;
`;