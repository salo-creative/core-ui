import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import { FlyOutButton } from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <FlyOutButton />
  );
  expect(container.firstChild).toMatchSnapshot();
});