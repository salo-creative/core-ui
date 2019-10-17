import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Stepper from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Stepper />
  );
  expect(container.firstChild).toMatchSnapshot();
});