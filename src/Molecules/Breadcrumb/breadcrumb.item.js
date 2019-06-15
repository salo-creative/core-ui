import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// COMPONENTS & STYLES
import { ItemWrapper, Divider } from './breadcrumb.styles';

const Item = (props) => {
  const { label, lastItem, link } = props;

  // Render the item as link or text
  const renderItem = () => {
    if (link && link.includes('://')) {
      return <a href={ link } title={ label }>{ label }</a>;
    }
    if (link) {
      return <Link to={ link }>{ label }</Link>;
    }
    return label;
  };

  return (
    <ItemWrapper>
      { renderItem() }
      { !lastItem && (
        <Divider>/</Divider>
      ) }
    </ItemWrapper>
  );
};

Item.defaultProps = {
  lastItem: false,
  link: ''
};

Item.propTypes = {
  label: PropTypes.string.isRequired,
  lastItem: PropTypes.bool,
  link: PropTypes.string
};

export default Item;