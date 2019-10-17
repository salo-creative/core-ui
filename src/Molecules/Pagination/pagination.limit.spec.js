import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import PaginationLimit from './pagination.limit';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <PaginationLimit />
  );
  expect(container.firstChild).toMatchSnapshot();
});