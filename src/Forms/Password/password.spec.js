import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Password from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Password />
  );
  expect(container.firstChild).toMatchSnapshot();
});