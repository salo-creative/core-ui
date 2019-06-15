import React from 'react';
import 'jest-styled-components';

// HELPERS
import { renderWithTheme } from '../../../test';

// COMPONENT
import Column from './index';

test('Render default Column and styles', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Column data-testid='test-column'>A tasty treat</Column>
  );
  const el = getByTestId('test-column');
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(container.firstChild).toMatchSnapshot();
});

test('Render Column and styles with core props', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Column
      column={ 16 }
      default={ 10 }
      large={ 10 }
      medium={ 9 }
      tablet={ 8 }
      small={ 7 }
      phone={ 6 }
      padding='20px'
      flexGrow='0'
      flexBasis='10%'
      flexShrink='1'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      data-testid='test-column'
    >
      A tasty treat
    </Column>
  );
  const el = getByTestId('test-column');
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(el).toHaveStyleRule('padding', '20px');
  expect(el).toHaveStyleRule('flex-grow', '0');
  expect(el).toHaveStyleRule('flex-shrink', '1');
  expect(el).toHaveStyleRule('flex-direction', 'row');
  expect(el).toHaveStyleRule('align-items', 'center');
  expect(el).toHaveStyleRule('justify-content', 'space-between');
  expect(container.firstChild).toMatchSnapshot();
});