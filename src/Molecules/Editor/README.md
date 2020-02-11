# Editor

Editor is a WYSIWYG based on Draft.js.

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Editor from '@salo/core-ui/Molecules/Editor';
```

Implement as follows, note if using with SSR it must be wrapped with a div.

```javascript
<div>
  <Editor
    limit={ 300 }
    value='<p><strong>some</strong> text</p>'
  />
</div>
```

You can pass a styleMap with [options defined here](https://draftjs.org/docs/advanced-topics-inline-styles/#mapping-a-style-string-to-css).