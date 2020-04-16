import React from 'react';
import { isEmpty } from 'lodash';

// COMPONENTS & STYLES
import Row from './table.row';
import { BodyWrapper, NoData, ErrorMessage } from './table.styles';
import P from '../../Typography/P';
import Button from '../../Molecules/Button';
import TableContext from './context/context';

const Body = () => {
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
  } = React.useContext(TableContext);

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
            item={ item }
          />
        );
      }) }
    </BodyWrapper>
  );
};

export default Body;