import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import ImageUpload from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <ImageUpload />
  );
  expect(container.firstChild).toMatchSnapshot();
});