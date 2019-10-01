import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import TableBody from './table.body';
import TableHeader from './table.header';
import TablePagination from './table.pagination';
import { TableWrapper, LoaderWrapper } from './table.styles';
import Loader from '../../Molecules/Loader';

// HELPERS
import { columnsProps, sortingProps } from './table.propTypes';

const Table = (props) => {
  const {
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

  const sortMe = ({ dataKey }) => {
    const sortingKey = get(sorting, 'dataKey', null);
    
    // There is no current sorting
    if (sortingKey === null) {
      onSort({ dataKey, direction: 'asc' });
    } else if (sortingKey !== dataKey) {
      // Sorting column is being changed
      onSort({ dataKey, direction: 'asc' });
    } else {
      // Changing the direction of the sorting column
      const direction = get(sorting, 'direction') === 'asc' ? 'desc' : 'asc';
      onSort({ dataKey, direction });
    }
  };

  return (
    <TableWrapper
      width={ width }
      className={ `salo-table ${ className } ${ borders ? '' : 'no-borders' }` }
    >
      { showHeader && (
        <TableHeader
          actionsWidth={ actionsWidth }
          columns={ columns }
          hasActions={ !!actions }
          sorting={ sorting }
          onSort={ sortMe }
        />
      ) }
      { /* Render body if we aren't loading */ }
      { !loading && (
        <TableBody
          actions={ actions }
          actionsWidth={ actionsWidth }
          columns={ columns }
          data={ data }
          dataEmptyComponent={ dataEmptyComponent }
          dataEmptyText={ dataEmptyText }
          error={ error }
          errorMessage={ errorMessage }
          retryAction={ retryAction }
          rowHeight={ rowHeight }
        />
      ) }
      { /* Render loader if we are fetching data */ }
      { loading && (
        <LoaderWrapper>
          <Loader
            display={ true }
          />
        </LoaderWrapper>
      ) }
      <TablePagination
        loading={ loading }
        pager={ pager }
        pagination={ pagination }
        pageChange={ pageChange }
      />
    </TableWrapper>
  );
};

Table.defaultProps = {
  actions: null,
  actionsWidth: '80px',
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
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    total: PropTypes.number
  }),
  pageChange: PropTypes.func
};

export default Table;