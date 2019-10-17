import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import TextArea from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <TextArea />
  );
  expect(container.firstChild).toMatchSnapshot();
});