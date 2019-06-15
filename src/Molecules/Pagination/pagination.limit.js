import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { Item, Ellipsis } from './pagination.styles';

const Limit = (props) => {
  const { changePage, page } = props;
  return (
    <React.Fragment>
      { page !== 1 && <Ellipsis>…</Ellipsis> }
      <Item
        key={ page }
        onClick={ () => changePage(page) }
      >{ page }
      </Item>
      { page === 1 && <Ellipsis>…</Ellipsis> }
    </React.Fragment>
  );
};

Limit.propTypes = {
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

export default Limit;