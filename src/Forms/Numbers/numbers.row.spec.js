import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import NumbersRow from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <NumbersRow />
  );
  expect(container.firstChild).toMatchSnapshot();
});