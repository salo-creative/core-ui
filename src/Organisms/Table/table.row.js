import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import { BodyRow, BodyCell, ActionCell } from './table.styles';

// HELPERS
import { columnsProps } from './table.propTypes';

const Row = (props) => {
  const {
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
      return render({ data });
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
            { renderContent({ render, dataKey }) }
          </BodyCell>
        );
      }) }
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
  actions: null,
  columns: []
};

Row.propTypes = {
  actions: PropTypes.any,
  actionsWidth: PropTypes.string.isRequired,
  columns: columnsProps,
  data: PropTypes.object.isRequired,
  rowHeight: PropTypes.string.isRequired
};

export default Row;