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