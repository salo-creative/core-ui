import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import DropDown from './drop.dropDown';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <DropDown element={ {
      clientHeight: 100,
      clientWidth: 100,
      getBoundingClientRect: () => {
        return {
          top: 100,
          left: 100,
          bottom: 100
        };
      }
    } }
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});