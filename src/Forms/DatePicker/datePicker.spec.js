import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import DatePicker from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <DatePicker />
  );
  expect(container.firstChild).toMatchSnapshot();
});