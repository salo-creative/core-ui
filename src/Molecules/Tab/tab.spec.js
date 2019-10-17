import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Tab from './index';

test('Renders against snapshot', async () => {
  const panes = [{
    title: 'Item 1',
    render: () => 'Item 1 content'
  }];
  const { container } = renderWithTheme(
    <Tab panes={ panes } />
  );
  expect(container.firstChild).toMatchSnapshot();
});