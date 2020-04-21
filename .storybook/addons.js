/* eslint-disable import/no-extraneous-dependencies, import/extensions */

import '@storybook/addon-links/register';
// import '@storybook/addon-options/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-jest/register';
import '@storybook/addon-notes/register';

import { addons } from '@storybook/addons';

addons.setConfig({
  brandTitle: 'Core UI',
  brandUrl: 'https://github.com/SaloCreative/core-ui',
  showPanel: true,
  panelPosition: 'right'
});