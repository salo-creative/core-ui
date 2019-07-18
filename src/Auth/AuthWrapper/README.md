# AuthWrapper

The AuthWrapper is a simple component that can be used in the app to show or hide content based on whether a user is logged in or not and has certain permissions.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import AuthWrapper from '@salo/core-ui/Auth/AuthWrapper';
```

Implement as follows

**Logged in user**

```javascript
<AuthWrapper>
  // ... this implementation will render its children if a user is logged in
</AuthWrapper>
```
**Logged out user**

```javascript
<AuthWrapper authenticated={ false }>
	// ... this implementation will render its children if a user is not logged in
</AuthWrapper>
```
**User with correct permissions**

```javascript
<AuthWrapper permissions={ ['permission_1', 'permission_2'] }>
	// ... this implementation will render its children if a user is logged in and has a matching permissions
</AuthWrapper>
```

It takes two props: -

* a bool for `authenticated`. When this is set to false it will only render its children if there is no logged in user. By default it is true and will only render its children if there is a logged in user.
* an array for `permissions` which is empty by default. If a user is logged in and a permissions array is passed to the component then the provider will compare those two arrays (expects `int` or `string` values within) and return the children to the user if they have adequate permissions. *n.b.* if `authenticate` is false then the permission check will not be run as the component assumes only logged in users have permissions. Also the permission check checks for only one of the permissions listed not all