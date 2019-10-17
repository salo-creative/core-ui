import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../../test';

// COMPONENT
import Strength from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Strength />
  );
  expect(container.firstChild).toMatchSnapshot();
});