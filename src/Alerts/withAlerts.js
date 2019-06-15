import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

// context
import { Consumer } from './alert.context';

// display name
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

// hoc
export default function withAlerts(WrappedComponent) {
  class Alerts extends React.Component {
    render() {
      return <WrappedComponent { ...this.props } />;
    }
  }

  const displayName = getDisplayName(WrappedComponent);

  Alerts.displayName = `withAlerts(${ displayName })`;
  /* eslint-disable react/no-multi-comp */
  const ForwardRef = React.forwardRef((props, ref) => {
    return (
      <Consumer>
        { ({ ...alertProps }) => {
          return (
            <Alerts
              { ...props }
              { ...alertProps }
              ref={ ref }
            />
          );
        } }
      </Consumer>
    );
  });
  /* eslint-enable react/no-multi-comp */

  hoistStatics(ForwardRef, WrappedComponent);
  return ForwardRef;
}