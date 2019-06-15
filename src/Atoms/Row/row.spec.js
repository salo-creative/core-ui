import React from 'react';
import 'jest-styled-components';

// HELPERS
import { renderWithTheme } from '../../../test';

// COMPONENT
import Row from './index';

test('Render default Row and styles', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Row data-testid='test-row'>A tasty treat</Row>
  );
  const el = getByTestId('test-row');
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(container.firstChild).toMatchSnapshot();
});

test('Render Row and styles with core props', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Row
      padding='20px'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      flexWrap='no-wrap'
      data-testid='test-row'
    >
      A tasty treat
    </Row>
  );
  const el = getByTestId('test-row');
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(el).toHaveStyleRule('padding', '20px');
  expect(el).toHaveStyleRule('flex-direction', 'column');
  expect(el).toHaveStyleRule('align-items', 'center');
  expect(el).toHaveStyleRule('justify-content', 'space-between');
  expect(el).toHaveStyleRule('flex-wrap', 'no-wrap');
  expect(container.firstChild).toMatchSnapshot();
});