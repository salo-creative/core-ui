import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

// COMPONENTS
import { Consumer as AuthConsumer } from '../auth.context';
import ExternalRedirect from '../ExternalRedirect';

class AuthRoute extends React.Component {
  shouldRenderLogin = (isLoggedIn) => {
    const { authenticated, loginRedirect } = this.props;
    // If not logged in show the login component
    return authenticated && !loginRedirect && !isLoggedIn;
  }

  evaluateCanAccess(isLoggedIn, hasPermissions) {
    const { notAuthenticated, authenticated, permissions } = this.props;
    // Deal with public routes or routes requiring users to not be logged in first
    if ((notAuthenticated && !isLoggedIn) || (!notAuthenticated && !authenticated)) {
      return true;
    }
    // Check if route requires user to not be logged in
    if (notAuthenticated && isLoggedIn) {
      return false;
    }
    // At this stage we know we are dealing with a route that needs login
    if (!isLoggedIn) return false; // bail if not a logged in user
    if (permissions.length) {
      return hasPermissions(permissions); // Do they have permission
    }
    return true;
  }

  renderRedirect({ showLogin, canAccess }) {
    const { path, exact, ignoreScrollBehavior, redirect, status } = this.props;
    if (showLogin || canAccess) return null;
    return (
      <Route
        exact={ exact }
        path={ path }
        status={ status }
        ignoreScrollBehavior={ ignoreScrollBehavior }
        render={ () => {
          if (redirect.includes('http')) {
            return <ExternalRedirect url={ redirect } />;
          }
          return <Redirect to={ redirect } />;
        } }
      />
    );
  }

  renderRoute = ({ canAccess }) => {
    const { component: ComposedComponent, path, title, componentProps, exact, ignoreScrollBehavior, status } = this.props;
    if (canAccess) {
      return (
        <Route
          exact={ exact }
          path={ path }
          status={ status }
          ignoreScrollBehavior={ ignoreScrollBehavior }
          render={ (props) => (
            <ComposedComponent
              title={ title }
              { ...componentProps }
              match={ props.match }
            />
          ) }
        />
      );
    }
    return null;
  }

  render() {
    return (
      <AuthConsumer>
        { ({ loggedIn, hasPermissions }) => {
          const isLoggedIn = loggedIn();
          const canAccess = this.evaluateCanAccess(isLoggedIn, hasPermissions);
          const showLogin = this.shouldRenderLogin(isLoggedIn);
          return (
            <React.Fragment>
              { this.renderRoute({ canAccess }) }
              { this.renderRedirect({ showLogin, canAccess }) }
            </React.Fragment>
          );
        } }
      </AuthConsumer>
    );
  }
}

AuthRoute.defaultProps = {
  authenticated: true, // If false the route will allow all users to access
  exact: false,
  ignoreScrollBehavior: false,
  loginRedirect: false,
  notAuthenticated: false, // If true the route requires user to be not logged in
  permissions: [],
  redirect: '/404-error',
  status: 200
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  componentProps: PropTypes.object.isRequired,
  exact: PropTypes.bool,
  ignoreScrollBehavior: PropTypes.bool,
  loginRedirect: PropTypes.bool,
  notAuthenticated: PropTypes.bool,
  path: PropTypes.string.isRequired,
  permissions: PropTypes.array,
  redirect: PropTypes.string,
  status: PropTypes.number,
  title: PropTypes.string.isRequired
};

export default AuthRoute;