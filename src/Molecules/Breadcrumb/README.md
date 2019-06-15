# Breadcrumb

This is a component for displaying navigational breadcrumbs

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Divider from '@salo/core-ui/Molecules/Breadcrumb';
```

Implement as follows

```javascript
<Breadcrumb
  margin='0 0 2rem'
  trail={ [
    { label: 'Home', link: 'https://www.google.co.uk'},
    { label: 'Previous page', link: '/previous-page' },
    { label: 'Current page' }
  ] }
>
```
If you pass a link url to an item in the breadcrumb it will by default render a React Link component for internal routing. If you need to use an external url in your breadcrumb simply include the protocol (don't do this bad UX!)

**For full prop types and usage see storybook info/knobs**