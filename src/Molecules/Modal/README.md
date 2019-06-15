# Modal

This is an animated modal component for rendering modals and dialogues in the applications. The modal renders as a react portal and will fully mount and unmount on show and hide.

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Modal from '@salo/core-ui/Molecules/Modal';
```

Implement as follows

```javascript
<Modal
  open={ this.state.modal }
  onClose={ () => this.setState({ modal: false })}
/>
```

**For full prop types and usage see storybook info/knobs**

