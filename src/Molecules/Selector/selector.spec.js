import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Selector from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Selector />
  );
  expect(container.firstChild).toMatchSnapshot();
});