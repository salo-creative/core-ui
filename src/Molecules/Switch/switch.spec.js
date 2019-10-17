import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Switch from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Switch />
  );
  expect(container.firstChild).toMatchSnapshot();
});