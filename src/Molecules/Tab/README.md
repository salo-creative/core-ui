# Tab

A component to wrap other components in tabs.

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Tab from ' @salo/core-ui/Molecules/Tab';
```

Implement as follows

```javascript
const panes = [
  { 
    title: 'Tab 1', 
    render: (
      <p>This tab has JSX content</p>
    ),
  }
];

<Tab panes={ panes } />
```
