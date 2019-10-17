import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Range from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Range />
  );
  expect(container.firstChild).toMatchSnapshot();
});