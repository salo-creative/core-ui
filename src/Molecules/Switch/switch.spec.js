import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from '../../../test';

// COMPONENT
import Switch from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithTheme(
    <Switch />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Has correct class names', async () => {
  const { container } = renderWithTheme(
    <Switch />
  );

  expect(container.querySelector('.salo-switch')).not.toBe(null);
  expect(container.querySelector('.salo-switch__container')).not.toBe(null);
  expect(container.querySelector('.salo-switch__handle')).not.toBe(null);
  expect(container.querySelector('.salo-switch__label')).not.toBe(null);
});

test('Class names update when active', async () => {
  const { getByRole } = renderWithTheme(
    <Switch
      value={ true }
    />
  );

  const switchEl = getByRole('switch');
  expect(switchEl.className.includes('salo-switch__container--active')).toBe(true);
  expect(switchEl.className.includes('salo-switch__container--inactive')).toBe(false);
});

test('Class name is correct when inactive', async () => {
  const { getByRole } = renderWithTheme(
    <Switch
      value={ false }
    />
  );

  const switchEl = getByRole('switch');
  expect(switchEl.className.includes('salo-switch__container--inactive')).toBe(true);
  expect(switchEl.className.includes('salo-switch__container--active')).toBe(false);
});

test('Loading classname is applied', async () => {
  const { container } = renderWithTheme(
    <Switch loading />
  );

  expect(container.querySelector('.salo-switch__loader')).not.toBe(null);
});