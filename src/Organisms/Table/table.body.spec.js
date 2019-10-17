import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import TableBody from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <TableBody />
  );
  expect(container.firstChild).toMatchSnapshot();
});