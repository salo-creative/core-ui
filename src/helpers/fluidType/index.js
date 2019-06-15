import { isEmpty } from 'lodash';

export default function FluidType(options) {
  if (isEmpty(options)) {
    console.error('Fluid type expects arguments for fontSize and linHeight');
    return null;
  }

  const { fontSize, lineHeight, breakpoint } = options;

  if (fontSize.length <= 1) {
    console.warn('Fluid type expects a min and max font size');
  }

  if (lineHeight.length <= 1) {
    console.warn('Fluid type expects a min and max line height');
  }

  const minVW = breakpoint ? breakpoint[0] : 400;
  const maxVW = breakpoint ? breakpoint[1] : 1200;
  const minFS = fontSize[0];
  const maxFS = fontSize[1];
  const minLH = lineHeight[0];
  const maxLH = lineHeight[1];

  return `
    ${ minFS ? `font-size: ${ minFS }px;` : '' }
    ${ minLH ? `line-height: ${ minLH }px;` : '' }

    @media screen and (min-width: ${ minVW }px) {
      ${ minFS && maxFS ? `
        font-size: calc(${ minFS }px + (${ maxFS } - ${ minFS }) * (100vw - ${ minVW }px) / (${ maxVW } - ${ minVW }));
      ` : '' }
      ${ minLH && maxLH ? `
        line-height: calc(${ minLH }px + (${ maxLH } - ${ minLH }) * (100vw - ${ minVW }px) / (${ maxVW } - ${ minVW }));
      ` : '' }
    }

    @media screen and (min-width: ${ maxVW }px) {
      ${ maxFS ? `font-size: ${ maxFS }px;` : '' }
      ${ maxLH ? `line-height: ${ maxLH }px;` : '' }
    }
  `;
}