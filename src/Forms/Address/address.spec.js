import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Address from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Address />
  );
  expect(container.firstChild).toMatchSnapshot();
});