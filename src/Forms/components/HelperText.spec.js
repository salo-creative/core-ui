import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import HelperText from './HelperText';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <HelperText />
  );
  expect(container.firstChild).toMatchSnapshot();
});