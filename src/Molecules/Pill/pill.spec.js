import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Pill from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Pill />
  );
  expect(container.firstChild).toMatchSnapshot();
});