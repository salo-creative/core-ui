import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Provider } from './context';

// HELPERS
import useWindowSize from '../../../helpers/hooks/resize';
import { determineThreshold } from '../table.helpers';
import { columnsProps, sortingProps } from '../table.propTypes';

const TableProvider = (props) => {
  const {
    value,
    children,
    initialCardThreshold
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
    width
  } = value;
  
  // * States
  const [layout, setLayout] = React.useState('table');
  const [mounted, setMounted] = React.useState(false);
  const [cardThresholdWidth, setCardThresholdWidth] = React.useState(initialCardThreshold);

  // * Refs
  const tableEl = React.useRef(null);

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
  // Find smallest width table is possible before switching to card layout.
  React.useEffect(() => {
    const threshold = determineThreshold({
      action,
      actionWidth,
      actions,
      actionsWidth,
      columns
    });

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

  // Change when component is mounted to hide skeleton.
  React.useEffect(() => {
    // Timeout covers up a brief flash between component mounting
    // and state updating to select a layout.
    const tick = setTimeout(() => {
      if (!loading) {
        setMounted(true);
      }
    }, 100);
    return () => {
      clearTimeout(tick);
    };
  }, [loading]);
  
  const values = {
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
    mounted,
    onSort,
    pageChange,
    pager,
    pagination,
    retryAction,
    rowHeight,
    showHeader,
    sorting,
    sortMe,
    tableEl,
    width
  };
  
  if (typeof children === 'function') {
    return (
      <Provider value={ {
        ...values
      } }
      >
        { children({
          ...values
        }) }
      </Provider>
    );
  }

  return (
    <Provider value={ {
      ...values
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
  children: PropTypes.any.isRequired,
  initialCardThreshold: PropTypes.number.isRequired
};

export default TableProvider;