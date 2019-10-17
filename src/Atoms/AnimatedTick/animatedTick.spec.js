import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import AnimatedTick from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <AnimatedTick />
  );
  expect(container.firstChild).toMatchSnapshot();
});