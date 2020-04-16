import React from 'react';
import { get } from 'lodash';
import { ThemeContext } from 'styled-components';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { HeaderRow, HeaderCell, HeaderSorting } from './table.styles';

// HELPERS
import TableContext from './context/context';

const Header = () => {
  const {
    action,
    actions,
    actionWidth,
    actionsWidth,
    columns,
    layout,
    sorting,
    onSort
  } = React.useContext(TableContext);
  const theme = React.useContext(ThemeContext);

  // Determines the sorting icon to be rendered
  const sortingIcon = (dataKey) => {
    const sortingKey = get(sorting, 'dataKey', null);

    if (sortingKey === null || sortingKey !== dataKey) {
      return 'chevron_up_down';
    }

    return get(sorting, 'direction') === 'asc' ? 'chevron_up' : 'chevron_down';
  };

  const isCard = layout === 'card';

  return (
    <HeaderRow
      className='salo-table__header'
      isCard={ isCard }
    >
      { columns.map(column => {
        const { label, minWidth, dataKey, sortable } = column;
        const icon = sortingIcon(dataKey);
        return (
          <HeaderCell
            className='salo-table__header-cell'
            key={ dataKey }
            flexBasis={ `${ 100 / columns.length }%` }
            minWidth={ minWidth }
          >
            { label }
            { sortable && (
              <HeaderSorting onClick={ () => onSort({
                dataKey
              }) }
              >
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
      { !!action && (
        <HeaderCell
          key='action'
          flexBasis={ actionWidth }
          minWidth={ actionWidth }
        />
      ) }
      { !!actions && (
        <HeaderCell
          key='actions'
          flexBasis={ actionsWidth }
          minWidth={ actionsWidth }
        />
      ) }
    </HeaderRow>
  );
};

export default Header;