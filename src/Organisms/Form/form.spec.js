import React from 'react';
import 'jest-styled-components';

import { renderWithApollo } from '../../../test';

// COMPONENT
import Form from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithApollo(
    <Form />
  );
  expect(container.firstChild).toMatchSnapshot();
});