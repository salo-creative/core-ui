# RenderHTML

This component is for rendering strings passed in via the content prop as HTML. All such strings are first sanitized using DomPurify.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import RenderHTML from '@salo/core-ui/Forms/RenderHTML';
```

Implement as follows

```javascript
<RenderHTML
  content="<h1>Hello, world!</h1>"
/>
```