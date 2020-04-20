import PropTypes from 'prop-types';

/**
 * Column props
 */
export const columnProps = PropTypes.shape({
  dataKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  minWidth: PropTypes.string.isRequired,
  render: PropTypes.func,
  sortable: PropTypes.bool,
  width: PropTypes.string
});

export const columnsProps = PropTypes.arrayOf(columnProps);

/**
 * Sorting props
 */
export const sortingProps = PropTypes.shape({
  direction: PropTypes.oneOf(['asc', 'desc']),
  dataKey: PropTypes.string
});