import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { Item } from './pagination.styles';

const Advance = (props) => {
  const { changePage, page, pages, type } = props;
  const disabled = (type === 'next' && pages <= page) || (type === 'previous' && page === 1);
  const targetPage = type === 'next' ? page + 1 : page - 1;
  return (
    <React.Fragment>
      <Item
        disabled={ disabled }
        key={ type }
        onClick={ () => changePage(targetPage) }
      >
        <Icon icon={ type === 'next' ? 'arrow_right' : 'arrow_left' } />
      </Item>
    </React.Fragment>
  );
};

Advance.propTypes = {
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['next', 'previous']).isRequired
};

export default Advance;