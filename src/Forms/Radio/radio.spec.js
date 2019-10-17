import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Radio from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Radio />
  );
  expect(container.firstChild).toMatchSnapshot();
});