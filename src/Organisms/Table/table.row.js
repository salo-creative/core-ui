import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import TableContext from './context/context';
import { BodyRow, BodyCell, ActionCell } from './table.styles';

const Row = (props) => {
  const { item } = props;
  const {
    action,
    actionWidth,
    actions,
    actionsWidth,
    columns,
    layout,
    rowHeight
  } = React.useContext(TableContext);

  const isCard = layout === 'card';
  
  const renderValue = (dataKey) => {
    const value = get(item, `${ dataKey }`, '-');
    if (typeof value === 'boolean') {
      return value.toString();
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  };

  const renderContent = ({ render, dataKey }) => {
    if (typeof render === 'function') {
      return render({
        data: item
      });
    }
    return renderValue(dataKey);
  };

  return (
    <BodyRow height={ rowHeight } isCard={ isCard }>
      { columns.map(column => {
        const { dataKey, minWidth, render } = column;
        return (
          <BodyCell
            key={ dataKey }
            isCard={ isCard }
            flexBasis={ `${ 100 / columns.length }%` }
            minWidth={ minWidth }
          >
            { renderContent({
              render, dataKey
            }) }
          </BodyCell>
        );
      }) }
      { !!action && (
        <BodyCell
          key='action'
          isCard={ isCard }
          minWidth={ actionWidth }
        >
          { action(item) }
        </BodyCell>
      ) }
      { !!actions && (
        <ActionCell
          key='actions'
          isCard={ isCard }
          width={ actionsWidth }
        >
          { actions(item) }
        </ActionCell>
      ) }
    </BodyRow>
  );
};

Row.propTypes = {
  item: PropTypes.object.isRequired
};

export default Row;