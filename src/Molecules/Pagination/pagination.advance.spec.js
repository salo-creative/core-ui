import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import PaginationAdvance from './pagination.advance';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <PaginationAdvance />
  );
  expect(container.firstChild).toMatchSnapshot();
});