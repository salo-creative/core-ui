import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import PasswordHelper from './password.helper';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <PasswordHelper />
  );
  expect(container.firstChild).toMatchSnapshot();
});