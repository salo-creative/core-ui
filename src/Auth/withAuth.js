import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

// context
import { Consumer } from './auth.context';

// display name
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

// hoc
export default function withAuth(WrappedComponent) {
  class Auth extends React.Component {
    render() {
      return <WrappedComponent { ...this.props } />;
    }
  }

  const displayName = getDisplayName(WrappedComponent);

  Auth.displayName = `withAuth(${ displayName })`;
  /* eslint-disable react/no-multi-comp */
  const ForwardRef = React.forwardRef((props, ref) => {
    return (
      <Consumer>
        { ({ ...authProps }) => {
          return (
            <Auth
              { ...props }
              { ...authProps }
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