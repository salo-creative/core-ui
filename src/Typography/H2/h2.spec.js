import React from 'react';
import 'jest-styled-components';

// HELPERS
import { fluidTypeVals, renderWithTheme } from '../../../test';

// COMPONENT
import H2 from './index';
import { colours } from '../../helpers/colours';

test('Render default H2 tag and styles', async () => {
  // Variables
  const minFS = 27;
  const maxFS = 40;
  const minLH = 31;
  const maxLH = 47;
  // Render
  const { getByTestId, container } = renderWithTheme(
    <H2 data-testid='test-text'>A tasty treat</H2>
  );
  const el = getByTestId('test-text');
  const fontSizes = fluidTypeVals({ minLH, maxLH, maxFS, minFS });
  // Assert
  expect(el).toHaveTextContent('A tasty treat');
  expect(el).toHaveStyleRule('color', colours.black);
  expect(el).toHaveStyleRule('padding', '0');
  expect(el).toHaveStyleRule('margin', '30px 0 10px');
  expect(el).toHaveStyleRule('font-size', `${ minFS }px`);
  expect(el).toHaveStyleRule('font-size', fontSizes.minFont, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('font-size', `${ maxFS }px`, { media: 'screen and (min-width:1200px)' });
  expect(el).toHaveStyleRule('line-height', `${ minLH }px`);
  expect(el).toHaveStyleRule('line-height', fontSizes.minLineHeight, { media: 'screen and (min-width:400px)' });
  expect(el).toHaveStyleRule('line-height', `${ maxLH }px`, { media: 'screen and (min-width:1200px)' });
  expect(container.firstChild).toMatchSnapshot();
});

test('Render H2 tag with core props', async () => {
  // Render
  const { getByTestId, container } = renderWithTheme(
    <H2
      data-testid='test-text'
      fontSize='30px'
      color='#333'
      lineHeight='40px'
      align='right'
      margin='10px 0 10px'
      padding='10px 20px'
    >
      A tasty treat
    </H2>
  );
  const el = getByTestId('test-text');
  // Assert
  expect(el).toHaveStyleRule('padding', '10px 20px');
  expect(el).toHaveStyleRule('margin', '10px 0 10px');
  expect(el).toHaveStyleRule('font-size', '30px');
  expect(el).toHaveStyleRule('line-height', '40px');
  expect(el).toHaveStyleRule('text-align', 'right');
  expect(el).toHaveStyleRule('color', '#333');
  expect(container.firstChild).toMatchSnapshot();
});

test('Render H2 tag with fluid type props', async () => {
  // Variables
  const minFS = 60;
  const maxFS = 100;
  const minLH = 70;
  const maxLH = 110;
  // Render
  const { getByTestId, container } = renderWithTheme(
    <H2
      data-testid='test-text'
      minFont={ minFS }
      maxFont={ maxFS }
      minLine={ minLH }
      maxLine={ maxLH }
    >
      A tasty treat
    </H2>
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