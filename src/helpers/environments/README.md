# Environments

The environment helpers are designed to centralise the definitions of any environment specific variables, e.g. urls, keys etc and allow for simple builds of the applications. Most if not all of the environment helpers switch based on webpack variables defined within the applications webpack config. 

The reason this centralised definition is important is so that any change to urls or API keys etc can be made in a single location and then rolled out to all the apps very quickly. Otherwise changes to top level domains, expired keys etc would be a laborious process of find and replace across all the apps.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import { ENV, isBrowser } from '@salo/core-ui/helpers/environments';
```

## ENV

This is the core environment variable that the others are switched on. This value is taken from webpack variables at compile time and cannot be changed dynamically at runtime. This means it is safe to use a single source of truth for the environment. The possible values returned are `local`, `staging` and `production`;

## isBrowser

Returns a boolean as to whether we are client side or server side