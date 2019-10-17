import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import ReadOnly from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <ReadOnly />
  );
  expect(container.firstChild).toMatchSnapshot();
});