import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Provider } from './context';

// HELPERS
import { columnsProps, sortingProps } from '../table.propTypes';

const TableProvider = (props) => {
  const {
    value,
    children
  } = props;

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
    sorting,
    onSort,
    width
  } = value;

  return (
    <Provider value={ {
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
      sorting,
      onSort,
      width
    } }
    >
      { children }
    </Provider>
  );
};

TableProvider.propTypes = {
  value: PropTypes.shape({
    action: PropTypes.func,
    actionWidth: PropTypes.string,
    actions: PropTypes.func,
    actionsWidth: PropTypes.string,
    borders: PropTypes.bool,
    columns: columnsProps,
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    dataEmptyComponent: PropTypes.any,
    dataEmptyText: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    pager: PropTypes.bool,
    retryAction: PropTypes.func,
    rowHeight: PropTypes.string,
    showHeader: PropTypes.bool,
    sorting: sortingProps,
    onSort: PropTypes.func,
    width: PropTypes.string,
    pagination: PropTypes.shape({
      perPage: PropTypes.number,
      page: PropTypes.number,
      pages: PropTypes.number,
      total: PropTypes.number
    }),
    pageChange: PropTypes.func
  }).isRequired,
  children: PropTypes.any.isRequired
};

export default TableProvider;