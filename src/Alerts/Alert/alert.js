import React from 'react';
import PropTypes from 'prop-types';

// STYLES
import { AlertWrapper, Close } from './alert.styles';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    const { alert } = props;
    const timeout = typeof alert.time === 'undefined' || alert.time;
    const dismissible = typeof alert.dismissible === 'undefined' || alert.dismissible;
    this.state = {
      dismissible,
      timer: timeout && dismissible
    };
  }

  componentDidMount() {
    const { alert, setAlertClear } = this.props;
    const { timer } = this.state;
    if (timer && typeof setAlertClear === 'function') {
      setAlertClear(alert.id, alert.time);
      // this.setState({ timer: false });
    }
  }

  renderClose() {
    const { alert, clearAlert } = this.props;
    const { dismissible } = this.state;
    if (dismissible) {
      return (
        <Close onClick={ () => clearAlert(alert.id) } role='button' tabIndex='-1'>
          <span>X</span>
        </Close>
      );
    }
    return null;
  }

  render() {
    const { alert } = this.props;
    const { timer } = this.state;
    if (alert) {
      return (
        <AlertWrapper
          className={ `${ alert.type }` }
          time={ alert.time }
          timer={ timer }
        >
          { alert.message }
          { this.renderClose() }
        </AlertWrapper>
      );
    }
    return null;
  }
}

Alert.defaultProps = {
  setAlertClear: null,
  clearAlert: null
};

Alert.propTypes = {
  alert: PropTypes.any.isRequired,
  setAlertClear: PropTypes.func,
  clearAlert: PropTypes.func
};

export default Alert;