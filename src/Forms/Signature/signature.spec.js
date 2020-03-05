import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Signature from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Signature />
  );
  expect(container.firstChild).toMatchSnapshot();
});