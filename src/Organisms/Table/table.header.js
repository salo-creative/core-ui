import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { ThemeContext } from 'styled-components';

// COMPONENTS & STYLES
import Icon from '@salo/icons';
import { HeaderRow, HeaderCell, HeaderSorting } from './table.styles';

// HELPERS
import { columnsProps, sortingProps } from './table.propTypes';

const Header = (props) => {
  const { actionsWidth, columns, hasActions, sorting, onSort } = props;

  // Determines the sorting icon to be rendered
  const sortingIcon = (dataKey) => {
    const sortingKey = get(sorting, 'dataKey', null);

    if (sortingKey === null || sortingKey !== dataKey) {
      return 'chevron_up_down';
    }

    return get(sorting, 'direction') === 'asc' ? 'chevron_up' : 'chevron_down';
  };

  const theme = React.useContext(ThemeContext);

  return (
    <HeaderRow className='salo-table__header'>
      { columns.map(column => {
        const { label, minWidth, dataKey, sortable } = column;
        const icon = sortingIcon(dataKey);
        return (
          <HeaderCell
            key={ dataKey }
            flexBasis={ `${ 100 / columns.length }%` }
            minWidth={ minWidth }
          >
            { label }
            { sortable && (
              <HeaderSorting onClick={ () => onSort({ dataKey }) }>
                <Icon
                  size={ 24 }
                  fill={ icon === 'chevron_up_down' ? theme.grey : theme.primary }
                  icon={ icon }
                />
              </HeaderSorting>
            ) }
          </HeaderCell>
        );
      }) }
      { hasActions && (
        <HeaderCell
          key='actions'
          flexBasis={ actionsWidth }
          minWidth={ actionsWidth }
        />
      ) }
    </HeaderRow>
  );
};

Header.defaultProps = {
  columns: [],
  sorting: {},
  onSort: () => null
};

Header.propTypes = {
  actionsWidth: PropTypes.string.isRequired,
  columns: columnsProps,
  sorting: sortingProps,
  onSort: PropTypes.func,
  hasActions: PropTypes.bool.isRequired
};

export default Header;