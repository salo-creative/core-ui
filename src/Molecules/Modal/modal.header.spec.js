import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import ModalHeader from './modal.header';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <ModalHeader />
  );
  expect(container.firstChild).toMatchSnapshot();
});