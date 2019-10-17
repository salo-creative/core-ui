import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import TablePagination from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <TablePagination />
  );
  expect(container.firstChild).toMatchSnapshot();
});