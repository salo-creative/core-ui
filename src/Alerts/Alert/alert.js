import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

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
      timer: timeout && dismissible,
      mounted: false
    };
  }

  componentDidMount() {
    const { alert, setAlertClear } = this.props;
    const { timer } = this.state;

    // Timeout as otherwise it doesn't transition.
    setTimeout(() => {
      this.setState({
        mounted: true
      });
    }, 10);
    
    if (timer && typeof setAlertClear === 'function') {
      setAlertClear(alert.id, alert.time);

      setTimeout(() => {
        // additional check to make sure alert hasn't already been dismissed.
        this.setState({
          mounted: false
        });
        // Hide just before it is cleared with 100ms grace.
      }, (alert.time * 1000) - 400);
    }
  }

  componentWillUnmount() {
    this.setState({
      mounted: false
    });
  }

  renderClose() {
    const { alert, clearAlert } = this.props;
    const { dismissible } = this.state;

    const handleClose = () => {
      this.setState({
        mounted: false
      });
      // Wait for animation then clear.
      setTimeout(() => {
        clearAlert(alert.id);
      }, 300);
    };

    if (dismissible) {
      return (
        <Close
          className='salo-alert__close'
          onClick={ handleClose }
          role='button'
          tabIndex='-1'
        >
          <Icon icon='close' fill='#fff' vAlign='middle' />
        </Close>
      );
    }
    return null;
  }

  render() {
    const { alert } = this.props;
    const { mounted } = this.state;
    if (alert) {
      return (
        <AlertWrapper
          className={ `salo-alert ${ alert.type }` }
          isMounted={ mounted }
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
        >
          <span className='salo-alert__message'>{ alert.message }</span>
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