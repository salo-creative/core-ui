import React from 'react';
import 'jest-styled-components';

// HELPERS
import { renderWithTheme } from '../../../test';

// COMPONENT
import Container from './index';

test('Render default Container and styles', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Container data-testid='test-container'>A tasty treat</Container>
  );
  const el = getByTestId('test-container');
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(el).toHaveStyleRule('padding', '10px');
  expect(el).toHaveStyleRule('max-width', '1280px');
  expect(container.firstChild).toMatchSnapshot();
});

test('Render Container and styles with core props', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Container
      padding='20px'
      width='200px'
      data-testid='test-container'
    >
      A tasty treat
    </Container>
  );
  const el = getByTestId('test-container');
  // Assert
  expect(el).toHaveStyleRule('padding', '20px');
  expect(el).toHaveStyleRule('max-width', '200px');
  expect(container.firstChild).toMatchSnapshot();
});