# Address

This is a compound component designed to simplify Address captures within applications. It captures address details in a standardised format. The field requires the first line of address, city and postcode. Beyond this you can also capture line 2 of address, county and country although these fields are not required. 

It is also possible to manage which of these additional fields are shown by passing an array of field names on the fields prop. If a blank array is passed then only the 3 required fields will render.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Address from '@salo/core-ui/Forms/Address';
```

Implement as follows

```javascript
<Address
  name='field_name'
  value={ this.state.address }
  onChange={ address => this.setState({  address }) }
/>
```