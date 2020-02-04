import React from 'react';
import 'jest-styled-components';

import { renderWithApollo } from '../../../test';

// COMPONENT
import FormStepper from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithApollo(
    <FormStepper />
  );
  expect(container.firstChild).toMatchSnapshot();
});