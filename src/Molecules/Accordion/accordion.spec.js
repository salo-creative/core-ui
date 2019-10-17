import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Accordion from './index';
import AccordionItem from './accordion.item';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Accordion>
      <AccordionItem
        id='1'
        label='label 1'
      >
        Item 1
      </AccordionItem>
      <AccordionItem
        id='2'
        label='label 2'
      >
        Item 2
      </AccordionItem>
    </Accordion>
  );
  expect(container.firstChild).toMatchSnapshot();
});