import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Button from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Button />
  );
  expect(container.firstChild).toMatchSnapshot();
});