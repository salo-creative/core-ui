import React from 'react';
import 'jest-styled-components';

import { renderWithApollo } from '../../../test';

// COMPONENT
import FormStep from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithApollo(
    <FormStep />
  );
  expect(container.firstChild).toMatchSnapshot();
});