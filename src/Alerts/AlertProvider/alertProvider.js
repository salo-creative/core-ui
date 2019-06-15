import React from 'react';
import PropTypes from 'prop-types';
import { find, filter } from 'lodash';
import uuid from 'uuid/v4';

// COMPONENTS
import { Provider } from '../alert.context';

// REDUCER
import reducer from './alertProvider.reducer';

const AlertProvider = (props) => {
  const { children } = props;

  const [alerts, dispatch] = React.useReducer(reducer, []);

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const deleteAlert = (alertID) => {
    dispatch({
      type: 'DELETE_ALERT',
      alert: alertID
    });
  };

  const insertAlert = (alert) => {
    dispatch({
      type: 'ADD_ALERT',
      alert: {
        ...alert,
        id: uuid()
      }
    });
  };

  const timeoutAlert = (alertID, time) => {
    setTimeout(() => {
      // additional check to make sure alert hasn't already been dismissed.
      if (find(alerts, { id: alertID })) {
        deleteAlert(alertID);
      }
    }, time * 1000);
  };

  return (
    <Provider
      value={ {
        alerts,
        deleteAlert,
        insertAlert,
        timeoutAlert,
        clearAll
      } }
    >
      { children }
    </Provider>
  );
};

AlertProvider.propTypes = { children: PropTypes.any.isRequired };

export default AlertProvider;