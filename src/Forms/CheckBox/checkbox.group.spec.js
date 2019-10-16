import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import CheckBoxGroup from './checkBox.group';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <CheckBoxGroup />
  );
  expect(container.firstChild).toMatchSnapshot();
});