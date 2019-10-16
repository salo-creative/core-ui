import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import { FlyOutLink } from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <FlyOutLink />
  );
  expect(container.firstChild).toMatchSnapshot();
});