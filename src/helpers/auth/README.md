# Auth

The auth helpers are here to simplify the token handling and expiry management of the JWT and user cookies that underpin the auth system. The auth system itself and the various permission checking functions are documented in the auth section of storybook as these functions are exposed via the AuthProvider and its context.

**n.b.** *there are very few cases where any of the functions below will need to be used in the app. If you are trying to check permissions, access the JWT or anything else relating to the users session please refer to the Auth section of storybook. These helpers are mostly used directly in the provider to access the low level user cookies etc and are only documented for completeness*

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import { getTokensServer, getTokensClient, tokenExpired } from '@salo/core-ui/helpers/auth';
```

## getTokensClient & getTokensServer

This function is primarily used to get the users cookies relating to the SC platform authentication and pass them to the AuthProvider. Any information contained in them should then be accessed from the provider as opposed to the cookies directly. However if for some reason you do need to access the cookies then this function can be used as follows: 

### Client

```javascript
import { getTokensClient } from '@salo/core-ui/helpers/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const sessionCookies = getTokensClient(cookies);
```

### Server

```javascript
import { getTokensServer } from '@salo/core-ui/helpers/auth';
import Cookies from 'universal-cookie';

const { cookies } = new Cookies(req.headers.cookie);

const sessionCookies = getTokensServer(cookies);
```

this will return an object containing the jwt and user cookies or null if they are not found. for full details of what these cookies contain see the auth section of storybook

```javascript
{
  jwt: // jwt cookie contents
}
```

## tokenExpired

This helper function will check if the jwt token has expired. When a user logs in a timestamp is stored in their auth cookie which allows for the jwt expiry to be checked simply. This check is crude but works as a simple session expiry mechanism for the time being. This function is used in various low level checks around requests to the GQL server and is unlikely to be used directly but it is available as follows:

```javascript
import { getSessionCookies, tokenExpired } from '@salo/core-ui/helpers/auth';

const { jwt } = getSessionCookies(); // Get the JWT to pass to the function or grab the  value from the auth context

const hasExpired = tokenExpired(jwt.ts); // pass ts value to function to check if in range
```

The function will return a boolean where a true value means the token has expired and false means it is still valid.