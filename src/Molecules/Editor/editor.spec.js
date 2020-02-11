import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Editor from './index';

test('it has correct class names', async () => {
  const { container } = renderWithTheme(
    <Editor />
  );
  expect(container.firstChild.querySelector('.salo-editor')).toBeDefined();
  expect(container.firstChild.querySelectorAll('.salo-editor__button')).toHaveLength(3);
});