# Password

This is a compound component designed to simplify password captures within applications. The component has a locked set of regex rules to enforce strong passwords as well as optional password confirmation field.

*n.b.* THIS SHOULD ONLY BE USED WHEN CAPTURING PASSWORDS. Do not use this for cases where users are entering their password to login etc.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Password from '@salo/core-ui/Forms/Password';
```

Implement as follows

```javascript
<Password
  name='field_name'
  Input={ Input } // Pass input field that must be used
  value={ this.state.Password }
  onChange={ Password => this.setState({  Password }) }
/>
```