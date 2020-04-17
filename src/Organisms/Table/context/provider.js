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
    tableEl,
    width
  } = value;
  
  // * States
  const [layout, setLayout] = React.useState('table');
  const [cardThresholdWidth, setCardThresholdWidth] = React.useState(0);

  // * Definitions
  const sortMe = ({ dataKey }) => {
    const sortingKey = sorting?.[dataKey] || null;
    
    // There is no current sorting
    if (sortingKey === null) {
      onSort({
        dataKey,
        direction: 'asc'
      });
    } else if (sortingKey !== dataKey) {
      // Sorting column is being changed
      onSort({
        dataKey,
        direction: 'asc'
      });
    } else {
      // Changing the direction of the sorting column
      const direction = sorting?.direction === 'asc' ? 'desc' : 'asc';
      onSort({
        dataKey,
        direction
      });
    }
  };

  // * Custom hooks
  // Used to trigger width recalc on resize
  const viewport = useWindowSize();

  // * Side-effects
  // Set smallest width before switching to card layout.
  React.useEffect(() => {
    // Loop through columns and find minWidths
    let threshold = columns.reduce((accum, column) => {
      if (column.minWidth) {
        return accum + parseInt(column.minWidth, 10);
      }
      return accum;
    }, 0);

    const GUTTER = 20;

    // If an action button is set then account for this.
    if (action) {
      threshold += (parseInt(actionWidth, 10) + GUTTER * 2);
    }
    
    // If actions is set then account for them.
    if (actions) {
      threshold += (parseInt(actionsWidth, 10) + GUTTER * 2);
    }

    setCardThresholdWidth(threshold);
  }, [action, actionWidth, actions, actionsWidth, columns]);

  // Decide whether to show card or table layout.
  React.useEffect(() => {
    if (tableEl.current?.parentElement.clientWidth <= cardThresholdWidth) {
      setLayout('card');
    } else if (layout === 'card') {
      setLayout('table');
    }
  }, [cardThresholdWidth, layout, tableEl, viewport]);

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
    tableEl: PropTypes.object.isRequired,
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