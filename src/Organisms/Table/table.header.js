import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { ThemeContext } from 'styled-components';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { HeaderRow, HeaderCell, HeaderSorting } from './table.styles';

// HELPERS
import TableContext from './context/context';

const Header = (props) => {
  const {
    hasAction,
    hasActions
  } = props;

  const {
    actionWidth,
    actionsWidth,
    columns,
    sorting,
    onSort
  } = React.useContext(TableContext);

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
      { hasAction && (
        <HeaderCell
          key='action'
          flexBasis={ actionWidth }
          minWidth={ actionWidth }
        />
      ) }
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

Header.propTypes = {
  hasAction: PropTypes.bool.isRequired,
  hasActions: PropTypes.bool.isRequired
};

export default Header;