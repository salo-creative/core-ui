import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Breadcrumb from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Breadcrumb />
  );
  expect(container.firstChild).toMatchSnapshot();
});