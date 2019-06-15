import React from 'react';
import PropTypes from 'prop-types';
import { hasIn, find, forEach, isEmpty, get } from 'lodash';
// import { withAlerts } from '@salocreative/alerts';
// // import { logApolloException } from '../../dev/sentry';
// // import { logApolloException } from '../../dev/sentry';

// // components
import withAlerts from '../../Alerts/withAlerts';

// HELPERS
import { parseApolloError } from '../helpers';

class ApolloError extends React.Component {
  constructor(props) {
    super(props);
    const {
      error,
      addAlert,
      insertAlert,
      debug,
      alertTime,
      alertDismissible,
      logSentry,
      report401,
      report403,
      report404,
      report422,
      name: propName
      // user,
      // jwt
    } = props;

    const { code, message, errors } = parseApolloError({ error, propName });

    // Debugging
    if (debug) {
      console.log({
        error: JSON.stringify(error),
        code,
        message
      });
    }

    // Sentry logging
    if (error && logSentry) {
      console.warn('SETUP SENTRY LOGGING');
      // logApolloException({
      //   error,
      //   code,
      //   name,
      //   extra: {
      //     ...extra,
      //     roles.jwt.roles
      //   },
      //   // user,
      //   allow401: report401,
      //   allow403: report403,
      //   allow404: report404,
      //   allow422: report422
      // });
    }

    // Add an alert for the initial message
    if (addAlert) {
      insertAlert({
        type: 'error',
        message,
        time: alertTime,
        dismissible: alertDismissible
      });
      // Add an alert for the errors array
      if (!isEmpty(errors)) {
        forEach(errors, (err) => insertAlert({
          type: 'error',
          message: err,
          time: alertTime,
          dismissible: alertDismissible
        }));
      }
    }

    this.state = {
      code,
      message,
      errors
    };
  }

  render() {
    const { children } = this.props;
    if (typeof children === 'function') {
      return children(this.state);
    }
    return children;
  }
}

ApolloError.defaultProps = {
  children: null,
  debug: false,
  report401: false,
  report403: false,
  report404: false,
  report422: false,
  logSentry: true,
  addAlert: true,
  alertTime: 10,
  alertDismissible: true,
  name: 'APOLLO_ERROR'
};

ApolloError.propTypes = {
  insertAlert: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  name: PropTypes.string,
  children: PropTypes.any,
  debug: PropTypes.bool,
  report401: PropTypes.bool,
  report403: PropTypes.bool,
  report404: PropTypes.bool,
  report422: PropTypes.bool,
  logSentry: PropTypes.bool,
  addAlert: PropTypes.bool,
  alertTime: PropTypes.number,
  alertDismissible: PropTypes.bool
};

export default withAlerts(ApolloError);