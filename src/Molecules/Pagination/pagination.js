import React from 'react';
import PropTypes from 'prop-types';
import { fill } from 'lodash';

// COMPONENTS & STYLES
import Advance from './pagination.advance';
import Limit from './pagination.limit';
import { Container, Item } from './pagination.styles';

const Pagination = (props) => {
  const {
    changePage,
    page,
    pagesToShow,
    perPage,
    total
  } = props;

  const pages = total ? Math.ceil((total / perPage)) : 0;

  // Exit if only one page
  if (pages <= 1) return null;

  const renderAll = () => {
    return fill(Array(pages)).map((_, i) => {
      const pageNumber = i + 1;
      return (
        <Item
          className={ pageNumber === page ? 'active' : '' }
          key={ pageNumber }
          onClick={ () => changePage(pageNumber) }
        >
          { pageNumber }
        </Item>
      );
    });
  };

  const renderPages = () => {
    // Chunk large pagination sets up with ellipses evenly around current page
    const chunkedPages = Math.floor(parseInt(pagesToShow, 10) / 2);

    if (!chunkedPages || (pagesToShow >= (pages - 1))) return renderAll(); // If not chunking just render

    // If we are chunking the pages and the pages to show is less than the page total chunk the list
    let start = page - chunkedPages; // Calculate page ranges
    let end = page + chunkedPages;
    if (start < 1) { // Handle outliers at start
      start = 1;
      end = ((chunkedPages * 2));
    }
    if (end > pages) { // Handle outliers at end
      end = pages;
      start = pages - (chunkedPages * 2);
    }

    // Generate pages
    const pageItems = [];
    for (let i = start; i <= end; i++) {
      pageItems.push({
        page: i,
        active: i === page
      });
    }

    return (
      <React.Fragment>
        { /* render start ellipsis and page number if needed */ }
        { (chunkedPages - (page - 1)) < 0 && (
          <Limit
            page={ 1 }
            changePage={ changePage }
          />
        ) }

        { /* render middle pagination */ }
        { pageItems.map(item => (
          <Item
            className={ item.active ? 'active' : '' }
            key={ item.page }
            onClick={ () => changePage(item.page) }
          >
            { item.page }
          </Item>
        )) }

        { /* render end ellipsis and page number if needed */ }
        { (chunkedPages + page) < pages && (
          <Limit
            page={ pages }
            changePage={ changePage }
          />
        ) }
      </React.Fragment>
    );
  };

  return (
    <Container>
      <Advance
        changePage={ changePage }
        page={ page }
        pages={ pages }
        type='previous'
      />
      { renderPages() }
      <Advance
        changePage={ changePage }
        page={ page }
        pages={ pages }
        type='next'
      />
    </Container>
  );
};

Pagination.defaultProps = {
  perPage: 24,
  page: 1,
  pagesToShow: null
};

Pagination.propTypes = {
  perPage: PropTypes.number,
  total: PropTypes.number.isRequired,
  page: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  pagesToShow: PropTypes.number
};


export default Pagination;