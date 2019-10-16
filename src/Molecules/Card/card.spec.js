import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Card from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Card />
  );
  expect(container.firstChild).toMatchSnapshot();
});