import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Selectput from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Selectput />
  );
  expect(container.firstChild).toMatchSnapshot();
});