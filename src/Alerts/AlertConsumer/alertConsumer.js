import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// COMPONENTS
import { Consumer } from '../alert.context';
import { AlertsContainer } from './alertConsumer.styles';
import Alert from '../Alert';

const AlertConsumer = (props) => {
  const { className, style, topOffset } = props;

  return (
    <Consumer>
      { ({ alerts, deleteAlert, timeoutAlert }) => {
        if (isEmpty(alerts)) return null;
        return (
          <AlertsContainer
            className={ className }
            style={ style }
            topOffset={ topOffset }
          >
            { alerts.map((alert, i) => (
              <Alert
                key={ alert.id }
                i={ i }
                alert={ alert }
                clearAlert={ (id) => deleteAlert(id) }
                setAlertClear={ timeoutAlert }
              />
            )) }
          </AlertsContainer>
        );
      } }
    </Consumer>
  );
};

AlertConsumer.defaultProps = {
  className: '',
  style: {},
  topOffset: 0
};

AlertConsumer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  topOffset: PropTypes.number
};

export default AlertConsumer;