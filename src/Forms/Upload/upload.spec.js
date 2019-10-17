import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Upload from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Upload />
  );
  expect(container.firstChild).toMatchSnapshot();
});