/**
 * BREAKPOINTS
 * An object containing the predefined breakpoints for the UI.
 * Additional ones can be used on a case by case basis as required
*/
export const breakpoints = {
  phone: 480,
  small: 620,
  tablet: 780,
  medium: 860,
  large: 1000,
  xLarge: 1200,
  xxLarge: 1400
};

/**
 * GETBREAKPOINT
 * A function that retrieves a breakpoint statement for styled components
 */
export const getBreakpoint = ({ min, max }) => {
  const minBp = min && breakpoints[min] ? `and (min-width: ${ breakpoints[min] }px)` : '';
  const maxBp = max && breakpoints[max] ? `and (max-width: ${ breakpoints[max] }px)` : '';
  return `@media only screen ${ minBp } ${ maxBp }`;
};