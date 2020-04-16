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
    rowHeight,
    showHeader
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
        const { dataKey, minWidth, render, label } = column;
        return (
          <BodyCell
            key={ dataKey }
            isCard={ isCard }
            flexBasis={ `${ 100 / columns.length }%` }
            minWidth={ minWidth }
          >
            { isCard && showHeader && <h4>{ label }</h4> }
            { renderContent({
              render,
              dataKey
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
          { actions(item, layout) }
        </ActionCell>
      ) }
    </BodyRow>
  );
};

Row.propTypes = {
  item: PropTypes.object.isRequired
};

export default Row;