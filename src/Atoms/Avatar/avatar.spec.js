import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Avatar from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Avatar />
  );
  expect(container.firstChild).toMatchSnapshot();
});