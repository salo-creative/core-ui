import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Provider } from './context';

// HELPERS
import useWindowSize from '../../../helpers/hooks/resize';
import { columnsProps, sortingProps } from '../table.propTypes';

const TableProvider = (props) => {
  const {
    value,
    children
  } = props;

  const {
    action,
    actions,
    actionsWidth,
    actionWidth,
    borders,
    cardThresholdWidth,
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
    sortMe,
    width
  } = value;
  
  const [layout, setLayout] = React.useState('row');

  const viewport = useWindowSize();

  // Decide whether to show card or row.
  React.useLayoutEffect(() => {
    if (viewport.width <= cardThresholdWidth) {
      setLayout('card');
    } else {
      setLayout('row');
    }
  }, [cardThresholdWidth, viewport.width]);

  return (
    <Provider value={ {
      action,
      actions,
      actionsWidth,
      actionWidth,
      borders,
      cardThresholdWidth,
      className,
      columns,
      data,
      dataEmptyComponent,
      dataEmptyText,
      error,
      errorMessage,
      layout,
      loading,
      onSort,
      pageChange,
      pager,
      pagination,
      retryAction,
      rowHeight,
      showHeader,
      sorting,
      sortMe,
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
    cardThresholdWidth: PropTypes.number.isRequired, // internally set
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
    sortMe: PropTypes.func.isRequired, // internally set
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