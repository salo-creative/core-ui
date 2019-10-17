import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import BreadcrumbItem from './breadcrumb.item';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <BreadcrumbItem />
  );
  expect(container.firstChild).toMatchSnapshot();
});