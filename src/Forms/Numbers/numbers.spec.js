import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Numbers from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Numbers />
  );
  expect(container.firstChild).toMatchSnapshot();
});