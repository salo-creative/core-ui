import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import DatePickerSelector from './datePicker.selector';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <DatePickerSelector />
  );
  expect(container.firstChild).toMatchSnapshot();
});