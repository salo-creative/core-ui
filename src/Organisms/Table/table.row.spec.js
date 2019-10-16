import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import TableRow from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <TableRow />
  );
  expect(container.firstChild).toMatchSnapshot();
});