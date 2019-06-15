# Stepper

This can be used for any stepped content. Especially useful for complex data forms

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Stepper from '@salo/core-ui/Molecules/Stepper';
```

Implement as follows

```javascript
<Stepper
  activeItem={ step } // Pass in the active item from state
  changeStep={ (step) => setState(step) } // Set new page of stepper to state
>
  { [
    {
      id: 'step_1', // the id used for changing step
      title: 'First step', // title for the stepper nav
      complete: true, // whether the step should render as complete
      disabled: false, // if the step is disabled
      content: ( // React components to render
        <React.Fragment>
          <P> Some lovely step content</P>
        </React.Fragment>
      )
    },
    {
      id: 'step_2',
      title: 'Second step',
      complete: false,
      content: (
        <React.Fragment>
          <P>Some more lovely step content</P>
        </React.Fragment>
      )
    },
    {
      id: 'step_3',
      title: 'Third step',
      disabled: true,
      complete: false,
      content: (
        <React.Fragment>
          <P>Some more lovely step content</P>
        </React.Fragment>
      )
    }
  ] }
</Stepper>
```

**For full prop types and usage see storybook info/knobs**

