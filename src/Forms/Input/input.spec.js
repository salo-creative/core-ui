import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Input from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Input />
  );
  expect(container.firstChild).toMatchSnapshot();
});