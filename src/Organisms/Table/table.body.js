import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// COMPONENTS & STYLES
import Row from './table.row';
import { BodyWrapper, NoData, ErrorMessage } from './table.styles';
import P from '../../Typography/P';
import Button from '../../Molecules/Button';

// HELPERS
import { columnsProps } from './table.propTypes';

const Body = (props) => {
  const {
    action,
    actionWidth,
    actions,
    actionsWidth,
    columns,
    data,
    dataEmptyComponent,
    dataEmptyText,
    error,
    errorMessage,
    retryAction,
    rowHeight
  } = props;

  // If an error let the user know and show a retry action
  if (error) {
    // If we have retry action display message and button
    if (retryAction) {
      return (
        <ErrorMessage>
          <P align='center' className='error'><strong>{ errorMessage }</strong></P>
          <P align='center'>You can retry the last action by pressing the button below.</P>
          <Button onClick={ retryAction } iconBefore='sync'>Retry</Button>
        </ErrorMessage>
      );
    }
    // Otherwise just show the message
    return (
      <NoData className='error'>{ errorMessage }</NoData>
    );
  }
  // If no data display a friendly message for the user
  if (isEmpty(data)) {
    if (dataEmptyComponent) return dataEmptyComponent;
    return (
      <NoData>{ dataEmptyText }</NoData>
    );
  }
  return (
    <BodyWrapper>
      { data.map((item, i) => {
        const key = `${ item[Object.keys(item)[0]] }-${ i }`;
        return (
          <Row
            key={ key }
            action={ action }
            actionWidth={ actionWidth }
            actions={ actions }
            actionsWidth={ actionsWidth }
            columns={ columns }
            data={ item }
            rowHeight={ rowHeight }
          />
        );
      }) }
    </BodyWrapper>
  );
};

Body.defaultProps = {
  actions: null,
  action: null,
  columns: [],
  data: [],
  dataEmptyComponent: null,
  retryAction: null
};

Body.propTypes = {
  action: PropTypes.any,
  actionWidth: PropTypes.string.isRequired,
  actions: PropTypes.any,
  actionsWidth: PropTypes.string.isRequired,
  columns: columnsProps,
  data: PropTypes.arrayOf(PropTypes.object),
  dataEmptyComponent: PropTypes.any,
  dataEmptyText: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  retryAction: PropTypes.func,
  rowHeight: PropTypes.string.isRequired
};

export default Body;