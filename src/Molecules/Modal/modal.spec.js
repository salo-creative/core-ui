import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Modal from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Modal />
  );
  expect(container.firstChild).toMatchSnapshot();
});