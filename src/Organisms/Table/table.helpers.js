import { memoize } from 'lodash';

/* eslint-disable object-curly-newline */
export const determineThreshold = ({ columns, action, actions, actionWidth, actionsWidth }) => {
  // Loop through columns and find minWidths
  let threshold = columns.reduce((accum, column) => {
    if (column.minWidth) {
      return accum + parseInt(column.minWidth, 10);
    }
    return accum;
  }, 0);

  const GUTTER = 20;

  // If an action button is set then account for this.
  if (action) {
    threshold += (parseInt(actionWidth, 10) + GUTTER * 2);
  }
    
  // If actions is set then account for them.
  if (actions) {
    threshold += (parseInt(actionsWidth, 10) + GUTTER * 2);
  }

  return threshold;
};

export const generateRows = memoize((offset = 0) => {
  // Generate 3 rows with 4 columns for use in table and card skeleton layouts.
  // Numbers predetermined but can be dynamically offset to replicate padding.
  return {
    card: [
      [{ x: offset, y: offset + 10 }, { x: offset, y: offset + 55 }, { x: offset, y: offset + 90 }, { x: offset, y: offset + 125 }],
      [{ x: offset, y: offset + 200 }, { x: offset, y: offset + 245 }, { x: offset, y: offset + 280 }, { x: offset, y: offset + 315 }],
      [{ x: offset, y: offset + 400 }, { x: offset, y: offset + 445 }, { x: offset, y: offset + 480 }, { x: offset, y: offset + 515 }]
    ],
    table: [
      [{ x: offset, y: offset }, { x: 220, y: offset + 5 }, { x: 620, y: offset + 5 }, { x: 780, y: offset + 5 }],
      [{ x: offset, y: offset + 55 }, { x: 220, y: offset + 55 + 5 }, { x: 620, y: offset + 55 + 5 }, { x: 780, y: offset + 55 + 5 }],
      [{ x: offset, y: offset + 110 }, { x: 220, y: offset + 110 + 5 }, { x: 620, y: offset + 110 + 5 }, { x: 780, y: offset + 110 + 5 }]
    ]
  };
});