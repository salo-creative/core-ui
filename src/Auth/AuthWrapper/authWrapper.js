import React from 'react';
import PropTypes from 'prop-types';

// CONTEXTS
import AuthContext from '../auth.context';

const AuthWrapper = (props) => {
  const { children, authenticated, permissions } = props;
  const { loggedIn, hasPermissions } = React.useContext(AuthContext);

  const isLoggedIn = loggedIn(); // Is the user logged in
  let allowedAccess = (isLoggedIn && authenticated) || (!isLoggedIn && !authenticated); // Can they access
  if (allowedAccess && authenticated && permissions.length) {
    allowedAccess = hasPermissions(permissions); // Do they have permission
  }

  return allowedAccess ? children : null;
};

AuthWrapper.defaultProps = {
  authenticated: true,
  permissions: []
};

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  permissions: PropTypes.any,
  authenticated: PropTypes.bool
};

export default AuthWrapper;