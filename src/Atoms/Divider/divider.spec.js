import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Divider from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Divider />
  );
  expect(container.firstChild).toMatchSnapshot();
});