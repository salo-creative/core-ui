import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import { BodyRow, BodyCell, ActionCell } from './table.styles';

// HELPERS
import { columnsProps } from './table.propTypes';

const Row = (props) => {
  const {
    action,
    actionWidth,
    actions,
    actionsWidth,
    columns,
    data,
    rowHeight
  } = props;
  
  const renderValue = (dataKey) => {
    const value = get(data, `${ dataKey }`, '-');
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
        data
      });
    }
    return renderValue(dataKey);
  };

  return (
    <BodyRow height={ rowHeight }>
      { columns.map(column => {
        const { dataKey, minWidth, render } = column;
        return (
          <BodyCell
            key={ dataKey }
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
          minWidth={ actionWidth }
        >
          { action(data) }
        </BodyCell>
      ) }
      { !!actions && (
        <ActionCell
          key='actions'
          width={ actionsWidth }
        >
          { actions(data) }
        </ActionCell>
      ) }
    </BodyRow>
  );
};

Row.defaultProps = {
  action: null,
  actions: null,
  columns: []
};

Row.propTypes = {
  action: PropTypes.func,
  actionWidth: PropTypes.string.isRequired,
  actions: PropTypes.any,
  actionsWidth: PropTypes.string.isRequired,
  columns: columnsProps,
  data: PropTypes.object.isRequired,
  rowHeight: PropTypes.string.isRequired
};

export default Row;