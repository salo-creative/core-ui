import React from 'react';
import 'jest-styled-components';

// HELPERS
import { fluidTypeVals, renderWithTheme } from '../../../test';
import { colours } from '../../helpers/colours';

// COMPONENT
import Ul from './index';

test('Render default Ul tag and styles', async () => {
  // Variables
  const minFS = 14;
  const maxFS = 17;
  const minLH = 17;
  const maxLH = 29;
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Ul data-testid='test-list'>
      <li>1 - Lorem ipsum</li>
      <li>2 - Lorem ipsum</li>
      <li>3 - Lorem ipsum</li>
    </Ul>
  );
  const el = getByTestId('test-list');
  const fontSizes = fluidTypeVals({ minLH, maxLH, maxFS, minFS });
  // Assert
  expect(el).toHaveStyleRule('color', colours.charcoal);
  expect(el).toHaveStyleRule('margin', '0 0 20px');
  expect(el).toHaveStyleRule('padding', '0 0 0 25px');
  expect(el).toHaveStyleRule('font-size', `${ minFS }px`);
  expect(el).toHaveStyleRule('font-size', fontSizes.minFont, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('font-size', `${ maxFS }px`, { media: 'screen and (min-width:1200px)' });
  expect(el).toHaveStyleRule('line-height', `${ minLH }px`);
  expect(el).toHaveStyleRule('line-height', fontSizes.minLineHeight, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('line-height', `${ maxLH }px`, { media: 'screen and (min-width:1200px)' });
  expect(container.firstChild).toMatchSnapshot();
});

test('Render Ul tag with core props', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Ul
      data-testid='test-list'
      padding='10px'
      margin='0 0 10px'
      fontSize='25px'
      lineHeight='30px'
      color='#333'
    >
      <li>1 - Lorem ipsum</li>
      <li>2 - Lorem ipsum</li>
      <li>3 - Lorem ipsum</li>
    </Ul>
  );
  const el = getByTestId('test-list');
  // Assert
  expect(el).toHaveStyleRule('margin', '0 0 10px');
  expect(el).toHaveStyleRule('padding', '10px');
  expect(el).toHaveStyleRule('font-size', '25px');
  expect(el).toHaveStyleRule('line-height', '30px');
  expect(el).toHaveStyleRule('color', '#333');
  expect(container.firstChild).toMatchSnapshot();
});

test('Render Ul tag with fluid type props', async () => {
  // Variables
  const minFS = 10;
  const maxFS = 18;
  const minLH = 18;
  const maxLH = 26;
  // Render
  const { getByTestId, container } = renderWithTheme(
    <Ul
      data-testid='test-list'
      minFont={ minFS }
      maxFont={ maxFS }
      minLine={ minLH }
      maxLine={ maxLH }
    >
      <li>1 - Lorem ipsum</li>
      <li>2 - Lorem ipsum</li>
      <li>3 - Lorem ipsum</li>
    </Ul>
  );
  const el = getByTestId('test-list');
  // Assert
  const fontSizes = fluidTypeVals({ minLH, maxLH, maxFS, minFS });
  expect(el).toHaveStyleRule('font-size', `${ minFS }px`);
  expect(el).toHaveStyleRule('font-size', fontSizes.minFont, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('font-size', `${ maxFS }px`, { media: 'screen and (min-width:1200px)' });
  expect(el).toHaveStyleRule('line-height', `${ minLH }px`);
  expect(el).toHaveStyleRule('line-height', fontSizes.minLineHeight, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('line-height', `${ maxLH }px`, { media: 'screen and (min-width:1200px)' });
  expect(container.firstChild).toMatchSnapshot();
});