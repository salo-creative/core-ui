import React from 'react';
import 'jest-styled-components';

// HELPERS
import { fluidTypeVals, renderWithTheme } from '../../../test';
import { colours } from '../../helpers/colours';

// COMPONENT
import P from './index';

test('Render default P tag and styles', async () => {
  // Variables
  const minFS = 14;
  const maxFS = 17;
  const minLH = 17;
  const maxLH = 29;
  // Render
  const { getByTestId, container } = renderWithTheme(
    <P data-testid='test-text'>A tasty treat</P>
  );
  const el = getByTestId('test-text');
  const fontSizes = fluidTypeVals({ minLH, maxLH, maxFS, minFS });
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(el).toHaveStyleRule('color', colours.charcoal);
  expect(el).toHaveStyleRule('margin', '0 0 20px');
  expect(el).toHaveStyleRule('padding', '0');
  expect(el).toHaveStyleRule('font-size', `${ minFS }px`);
  expect(el).toHaveStyleRule('font-size', fontSizes.minFont, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('font-size', `${ maxFS }px`, { media: 'screen and (min-width:1200px)' });
  expect(el).toHaveStyleRule('line-height', `${ minLH }px`);
  expect(el).toHaveStyleRule('line-height', fontSizes.minLineHeight, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('line-height', `${ maxLH }px`, { media: 'screen and (min-width:1200px)' });
  expect(container.firstChild).toMatchSnapshot();
});

test('Render P tag with core props', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <P
      data-testid='test-text'
      fontSize='30px'
      color='#333'
      lineHeight='40px'
      align='right'
      margin='0 0 10px'
      padding='10px'
    >
      A tasty treat
    </P>
  );
  const el = getByTestId('test-text');
  // Assert
  expect(el).toHaveStyleRule('margin', '0 0 10px');
  expect(el).toHaveStyleRule('padding', '10px');
  expect(el).toHaveStyleRule('font-size', '30px');
  expect(el).toHaveStyleRule('line-height', '40px');
  expect(el).toHaveStyleRule('text-align', 'right');
  expect(el).toHaveStyleRule('color', '#333');
  expect(container.firstChild).toMatchSnapshot();
});

test('Render P tag with fluid type props', async () => {
  // Variables
  const minFS = 10;
  const maxFS = 18;
  const minLH = 18;
  const maxLH = 26;
  // Render
  const { getByTestId, container } = renderWithTheme(
    <P
      data-testid='test-text'
      minFont={ minFS }
      maxFont={ maxFS }
      minLine={ minLH }
      maxLine={ maxLH }
    >
      A tasty treat
    </P>
  );
  const el = getByTestId('test-text');
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