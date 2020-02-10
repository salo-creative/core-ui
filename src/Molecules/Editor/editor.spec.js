import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Editor from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Editor />
  );
  expect(container.firstChild).toMatchSnapshot();
});