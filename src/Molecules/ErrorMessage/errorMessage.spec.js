import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import ErrorMessage from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <ErrorMessage error={ {
      graphQLErrors: [{
        message: 'SC_ERROR'
      }]
    } }
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});