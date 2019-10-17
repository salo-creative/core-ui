import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import CheckBox from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <CheckBox />
  );
  expect(container.firstChild).toMatchSnapshot();
});