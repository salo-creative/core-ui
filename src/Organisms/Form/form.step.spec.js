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

test('Renders against snapshot', async () => {
  const boo = renderWithApollo(
    <FormStep showTitles title='Step title' />
  );

  debugger; //eslint-disable-line

  console.log(boo);
  expect(container.firstChild).toMatchSnapshot();
});