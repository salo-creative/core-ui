import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Drop from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Drop />
  );
  expect(container.firstChild).toMatchSnapshot();
});