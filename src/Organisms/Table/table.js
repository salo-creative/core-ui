import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Loader from '../../Molecules/Loader';
import TableProvider from './context/provider';
import TableBody from './table.body';
import TableHeader from './table.header';
import TablePagination from './table.pagination';
import { TableWrapper, LoaderWrapper } from './table.styles';

// HELPERS
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
    sorting,
    onSort,
    width
  } = props;

  const [cardThresholdWidth, setCardThresholdWidth] = React.useState(0);

  const sortMe = ({ dataKey }) => {
    const sortingKey = get(sorting, 'dataKey', null);
    
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
      const direction = get(sorting, 'direction') === 'asc' ? 'desc' : 'asc';
      onSort({
        dataKey,
        direction
      });
    }
  };

  React.useEffect(() => {
    // Set smallest width before switching to card layout.
    const threshold = columns.reduce((accum, column) => {
      if (column.minWidth) {
        return accum + parseInt(column.minWidth, 10);
      }
      return accum;
    }, 0);

    setCardThresholdWidth(threshold);
  }, [columns]);

  return (
    <TableProvider value={ {
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
      width,
      sortMe,
      cardThresholdWidth
    } }
    >
      <TableWrapper
        width={ width }
        className={ `salo-table ${ className } ${ borders ? '' : 'no-borders' }` }
      >
        { showHeader && (
          <TableHeader
            hasAction={ !!action }
            hasActions={ !!actions }
          />
        ) }
        { /* Render body if we aren't loading */ }
        { !loading && (
          <TableBody />
        ) }
        { /* Render loader if we are fetching data */ }
        { loading && (
          <LoaderWrapper>
            <Loader
              display={ true }
            />
          </LoaderWrapper>
        ) }
        { !loading && !error && (
          <TablePagination />
        ) }
      </TableWrapper>
    </TableProvider>
  );
};

Table.defaultProps = {
  action: null,
  actionWidth: '12rem',
  actions: null,
  actionsWidth: '8rem',
  borders: true,
  columns: [],
  className: '',
  data: [],
  dataEmptyComponent: null,
  dataEmptyText: 'There are no results to display',
  error: false,
  errorMessage: 'Something went wrong getting your data!',
  loading: false,
  pager: true,
  retryAction: null,
  rowHeight: '6rem',
  showHeader: true,
  sorting: {},
  onSort: () => null,
  width: '100%',
  pagination: null,
  pageChange: null
};

Table.propTypes = {
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
};

export default Table;