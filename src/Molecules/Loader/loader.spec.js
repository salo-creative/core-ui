import React from 'react';
import 'jest-styled-components';

// HELPERS
import { renderWithTheme } from '../../../test';

// COMPONENT
import Loader from './index';

test('Check default render doesnt show Loader and styles', async () => {
  // Render
  const { container } = renderWithTheme(
    <Loader />
  );
  // Assert
  expect(container.firstChild).toBeFalsy();
  expect(container.firstChild).toMatchSnapshot();
});

test('Check default Loader and styles render', async () => {
  // Render
  const { container, getByTestId } = renderWithTheme(
    <Loader
      display={ true }
      data-testid='test-loader'
    />
  );
  const el = getByTestId('pulse-loader');
  let takeover = null;
  try {
    takeover = getByTestId('loader-takeover');
  } catch (e) {
    // Not required just prevents test from throwing
  }
  // Assert
  expect(el).toHaveStyleRule('position', 'relative');
  expect(el).toHaveStyleRule('margin', '0 auto');
  expect(takeover).toBeFalsy();
  expect(container.firstChild).toMatchSnapshot();
});

test('Check light theme Loader and styles render', async () => {
  // Render
  const { container, getByTestId } = renderWithTheme(
    <Loader
      display={ true }
      appearance='light'
      loaderProps={ { position: 'absolute' } }
      data-testid='test-loader'
    />
  );
  const el = getByTestId('pulse-loader');
  // Assert
  expect(el).toHaveStyleRule('position', 'absolute');
  expect(el).toHaveStyleRule('top', '50%');
  expect(el).toHaveStyleRule('left', '50%');
  expect(el).toHaveStyleRule('transform', 'translate3d(-50%,-50%,0)');
  expect(container.firstChild).toMatchSnapshot();
});

test('Check takeover Loader and styles render', async () => {
  // Render
  const { container, getByTestId } = renderWithTheme(
    <Loader
      display={ true }
      takeover={ true }
      data-testid='test-loader'
    />
  );
  const el = getByTestId('pulse-loader');
  const takeover = getByTestId('loader-takeover');
  // Assert
  expect(el).toHaveStyleRule('position', 'absolute');
  expect(el).toHaveStyleRule('top', '50%');
  expect(el).toHaveStyleRule('left', '50%');
  expect(el).toHaveStyleRule('transform', 'translate3d(-50%,-50%,0)');
  expect(takeover).toHaveStyleRule('background', 'linear-gradient(to bottom,#00222b,#003645)');
  expect(container.firstChild).toMatchSnapshot();
});

test('Check takeover light appearance Loader and styles render', async () => {
  // Render
  const { container, getByTestId } = renderWithTheme(
    <Loader
      display={ true }
      takeover={ true }
      appearance='light'
      data-testid='test-loader'
    />
  );
  const takeover = getByTestId('loader-takeover');
  // Assert
  expect(takeover).toHaveStyleRule('background', '#fff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Check bar Loader and styles render', async () => {
  // Render
  const { container, getByTestId } = renderWithTheme(
    <Loader
      display={ true }
      type='bar'
      data-testid='test-loader'
    />
  );
  const el = getByTestId('bar-loader');
  // Assert
  expect(el).toHaveStyleRule('margin', '0 auto');
  expect(container.firstChild).toMatchSnapshot();
});

test('Check light theme bar Loader and styles render', async () => {
  // Render
  const { container, getByTestId } = renderWithTheme(
    <Loader
      display={ true }
      type='bar'
      appearance='light'
      loaderProps={ { position: 'absolute' } }
      data-testid='test-loader'
    />
  );
  const el = getByTestId('bar-loader');
  // Assert
  expect(el).toHaveStyleRule('position', 'absolute');
  expect(el).toHaveStyleRule('top', '50%');
  expect(el).toHaveStyleRule('left', '50%');
  expect(el).toHaveStyleRule('transform', 'translate3d(-50%,-50%,0)');
  expect(container.firstChild).toMatchSnapshot();
});