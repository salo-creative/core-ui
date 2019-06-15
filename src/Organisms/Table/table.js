import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, find, has, get } from 'lodash';

// COMPONENTS & STYLES
import TableBody from './table.body';
import TableHeader from './table.header';
import { TableWrapper, LoaderWrapper } from './table.styles';
import Loader from '../../Molecules/Loader';
import Pagination from '../../Molecules/Pagination';

// HELPERS
import { columnsProps, sortingProps } from './table.propTypes';

const Table = (props) => {
  const {
    actions,
    actionsWidth,
    columns,
    data,
    dataEmptyComponent,
    dataEmptyText,
    error,
    errorMessage,
    loading,
    pagination,
    pageChange,
    retryAction,
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
      { !isEmpty(pagination) && pageChange && (
        <Pagination
          { ...pagination }
          pagesToShow={ 7 }
          changePage={ pageChange }
        />
      ) }
    </TableWrapper>
  );
};

Table.defaultProps = {
  actions: null,
  actionsWidth: '80px',
  columns: [],
  data: [],
  dataEmptyComponent: null,
  dataEmptyText: 'There are no results to display',
  error: false,
  errorMessage: 'Something went wrong getting your data!',
  loading: false,
  retryAction: null,
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
  columns: columnsProps,
  data: PropTypes.arrayOf(PropTypes.object),
  dataEmptyComponent: PropTypes.any,
  dataEmptyText: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  retryAction: PropTypes.func,
  showHeader: PropTypes.bool,
  sorting: sortingProps,
  onSort: PropTypes.func,
  width: PropTypes.string,
  pagination: PropTypes.shape({
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number
  }),
  pageChange: PropTypes.func
};

export default Table;