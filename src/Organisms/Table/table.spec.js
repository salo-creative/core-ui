import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Table from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Table />
  );
  expect(container.firstChild).toMatchSnapshot();
});