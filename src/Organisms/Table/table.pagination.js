import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// COMPONENTS & STYLES
import Pagination from '../../Molecules/Pagination';
import Button from '../../Molecules/Button';
import TableContext from './context/context';
import { LoadMoreWrapper } from './table.styles';

const TablePagination = () => {
  const {
    loading,
    pager,
    pagination,
    pageChange
  } = React.useContext(TableContext);

  // Bailout if we have no pagination data or functions
  if (isEmpty(pagination) || !pageChange) return null;

  // Return pager style nav
  if (pager) {
    return (
      <Pagination
        { ...pagination }
        pagesToShow={ 7 }
        changePage={ pageChange }
      />
    );
  }

  // Render load more if we have pages of data left
  if (pagination.pages > pagination.page) {
    return (
      <LoadMoreWrapper>
        <Button
          className='salo-table__pagination-button'
          loading={ loading }
          onClick={ () => pageChange(pagination.page + 1) }
        >
            Load more
        </Button>
      </LoadMoreWrapper>
    );
  }

  return null;
};

TablePagination.defaultProps = {
  loading: false,
  pager: true,
  pagination: null,
  pageChange: null
};

TablePagination.propTypes = {
  loading: PropTypes.bool,
  pager: PropTypes.bool,
  pagination: PropTypes.shape({
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    total: PropTypes.number
  }),
  pageChange: PropTypes.func
};

export default TablePagination;