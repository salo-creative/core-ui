import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import TableContext from './context/context';
import {
  BodyRow, BodyCell, BodyCellHeading, BodyCellValue, ActionCell
} from './table.styles';

const Row = props => {
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
    const value = get(item, `${ dataKey }`, '—');
    if (typeof value === 'boolean') {
      return <BodyCellValue> { value.toString() } </BodyCellValue>;
    }
    if (typeof value === 'object') {
      return <BodyCellValue>{ JSON.stringify(value) }</BodyCellValue>;
    }
    return <BodyCellValue>{ value }</BodyCellValue>;
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
        const { dataKey, minWidth, width, render, label } = column;
        return (
          <BodyCell
            key={ dataKey }
            className={ `salo-table__body-cell salo-table__body-cell--${ dataKey } ${ isCard ? 'salo-table__body-cell--card' : '' } ` }
            flexBasis={ width || `${ 100 / columns.length }%` }
            isCard={ isCard }
            minWidth={ minWidth }
          >
            { /* In cards, show column heading above value */ }
            { isCard && showHeader && (
              <BodyCellHeading>{ label }</BodyCellHeading>
            ) }
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
          className='salo-table__body-cell'
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