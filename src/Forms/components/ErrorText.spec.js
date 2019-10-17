import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import ErrorText from './ErrorText';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <ErrorText />
  );
  expect(container.firstChild).toMatchSnapshot();
});