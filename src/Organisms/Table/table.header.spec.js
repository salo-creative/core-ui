import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import TableHeader from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <TableHeader />
  );
  expect(container.firstChild).toMatchSnapshot();
});