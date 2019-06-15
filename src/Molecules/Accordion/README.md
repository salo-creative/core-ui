# Accordion

This component functions as an accordion component like you might find anywhere on the web. All direct children of the Accordion are displayed inside Accordion Sections. They must have title, and they can optionally take an iconBefore argument that determines whether or not to display an icon before the title.

The accordion does not return values by itself, but instead just dresses up and organises other components.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Accordion, { AccordionItem } from '@salo/core-ui/Molecules/Accordion';
```

Implement as follows

```javascript
<Accordion>
  <AccordionItem
    id='1'
    label='label 1'
  >
   // Your content
  </AccordionItem>
  <AccordionItem
    id='2'
    label='label 2'
  >
   // Your content
  </AccordionItem>
</Accordion>
```