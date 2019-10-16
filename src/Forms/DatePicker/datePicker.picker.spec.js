import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import DatePickerPicker from './datePicker.picker';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <DatePickerPicker />
  );
  expect(container.firstChild).toMatchSnapshot();
});