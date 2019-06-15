# Breakpoints

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import { breakpoints, getBreakpoint } from '@salo/core-ui/helpers/breakpoints';
```

## Breakpoints

The breakpoints object is a centralised definition of all the breakpoints used in the applications and UI library. IT can be imported into you styled component definitions and has the following key/value's available on the object:

```
phone: 480,
small: 620,
tablet: 780,
medium: 860,
large: 1000,
xLarge: 1200,
xxLarge: 1400
```

## getBreakpoint

This is a helper function for generating css media queries using the central breakpoint definitions

it can be used as per the following:

```javascript
const Component = styled.div`
  width: 100%;
  ${ getBreakpoint({ min: 'large' }) } {
    width: 50%;
  }
`;
```

The function takes an object as an argument. The object should contain either a `min` value, a `max` value or both. These values should be strings corresponding to breakpoints defined in the object above. Based on what arguments are passed the function will output an appropriate media query.

e.g.

- `getBreakpoint({ min: 'large' })` will output `@media only screen and (min-width: 1000px)`
- `getBreakpoint({ max: 'large' })` will output `@media only screen and (max-width: 1000px)`
- `getBreakpoint({ min: 'tablet', max: 'xxlarge' })` will output `@media only screen and (min-width: 780px) and (max-width: 1400px)`



For full prop types and usage see storybook info/knobs