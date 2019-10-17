import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import ModalCore from './modal.core';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <ModalCore />
  );
  expect(container.firstChild).toMatchSnapshot();
});