import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import TypeAhead from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <TypeAhead />
  );
  expect(container.firstChild).toMatchSnapshot();
});