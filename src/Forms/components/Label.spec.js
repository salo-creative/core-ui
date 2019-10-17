import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Label from './Label';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Label />
  );
  expect(container.firstChild).toMatchSnapshot();
});