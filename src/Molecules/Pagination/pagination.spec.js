import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Pagination from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Pagination />
  );
  expect(container.firstChild).toMatchSnapshot();
});