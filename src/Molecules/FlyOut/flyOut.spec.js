import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import FlyOut, { FlyOutLink } from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <FlyOut>
      <FlyOutLink title='Title' link='#' icon='dashboard' />
    </FlyOut>
  );
  expect(container.firstChild).toMatchSnapshot();
});