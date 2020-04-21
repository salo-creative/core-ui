import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import TableProvider from './context/provider';
import TableBody from './table.body';
import TableHeader from './table.header';
import TablePagination from './table.pagination';
import { TableWrapper } from './table.styles';

// HELPERS
import { determineThreshold } from './table.helpers';
import { columnsProps, sortingProps } from './table.propTypes';

const Table = (props) => {
  const {
    action,
    actionWidth,
    actions,
    actionsWidth,
    borders,
    columns,
    className,
    data,
    dataEmptyComponent,
    dataEmptyText,
    error,
    errorMessage,
    loading,
    pager,
    pagination,
    pageChange,
    retryAction,
    rowHeight,
    showHeader,
    skeleton,
    sorting,
    onSort,
    width
  } = props;

  // Determine the initialCardThreshold to show the correct
  // skeleton loader. This is needed as otherwise we need to wait
  // for an async state update which can cause a render flash.
  const initialCardThreshold = determineThreshold({
    action,
    actionWidth,
    actions,
    actionsWidth,
    columns
  });

  return (
    <TableProvider
      initialCardThreshold={ initialCardThreshold }
      value={ {
        action,
        actionWidth,
        actions,
        actionsWidth,
        borders,
        className,
        columns,
        data,
        dataEmptyComponent,
        dataEmptyText,
        error,
        errorMessage,
        loading,
        onSort,
        pageChange,
        pager,
        pagination,
        retryAction,
        rowHeight,
        showHeader,
        sorting,
        width
      } }
    >
      { ({ cardThresholdWidth, mounted, tableEl }) => {
        return (
          <TableWrapper
            ref={ tableEl }
            className={ `salo-table ${ className } ${ borders ? '' : 'no-borders' }` }
            mounted={ mounted }
            width={ width }
            cardThresholdWidth={ cardThresholdWidth }
            skeleton={ skeleton }
          >
            { showHeader && (
              <TableHeader
                hasAction={ !!action }
                hasActions={ !!actions }
              />
            ) }
            <TableBody />
            { mounted && !error && (
              <TablePagination />
            ) }
          </TableWrapper>
        );
      } }
      
    </TableProvider>
  );
};

Table.defaultProps = {
  action: null,
  actions: null,
  actionsWidth: '80px',
  actionWidth: '120px',
  borders: true,
  className: '',
  columns: [],
  data: [],
  dataEmptyComponent: null,
  dataEmptyText: 'There are no results to display',
  error: false,
  errorMessage: 'Something went wrong getting your data!',
  loading: false,
  onSort: () => null,
  pageChange: null,
  pager: true,
  pagination: null,
  retryAction: null,
  rowHeight: '60px',
  showHeader: true,
  skeleton: null,
  sorting: {},
  width: '100%'
};

Table.propTypes = {
  action: PropTypes.func,
  actions: PropTypes.func,
  actionsWidth: PropTypes.string,
  actionWidth: PropTypes.string,
  borders: PropTypes.bool,
  className: PropTypes.string,
  columns: columnsProps,
  data: PropTypes.arrayOf(PropTypes.object),
  dataEmptyComponent: PropTypes.any,
  dataEmptyText: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  onSort: PropTypes.func,
  pageChange: PropTypes.func,
  pager: PropTypes.bool,
  retryAction: PropTypes.func,
  rowHeight: PropTypes.string,
  showHeader: PropTypes.bool,
  skeleton: PropTypes.shape(({
    background: PropTypes.arrayOf(PropTypes.number),
    foreground: PropTypes.arrayOf(PropTypes.number),
    offset: PropTypes.number
  })),
  sorting: sortingProps,
  width: PropTypes.string,
  pagination: PropTypes.shape({
    perPage: PropTypes.number,
    page: PropTypes.number,
    pages: PropTypes.number,
    total: PropTypes.number
  })
};

export default Table;