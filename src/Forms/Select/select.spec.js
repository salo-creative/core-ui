import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Select from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Select />
  );
  expect(container.firstChild).toMatchSnapshot();
});