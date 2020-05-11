import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import RenderHTML from './index';

test('Renders HTML passed as a content prop', async () => {
  const content = '<p data-testid="test-text">Test</p>';
  const { getByTestId } = renderWithTheme(
    <RenderHTML content={ content } />
  );
  const el = getByTestId('test-text');
  expect(el).toHaveTextContent('Test');
});