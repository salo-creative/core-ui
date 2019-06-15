import { darken } from 'polished';

/**
 * COLOUR DEFINITIONS
 *
 * Fixed colour definitions to ensure
 * centralised definition of consts
 */
export const colours = {
  blue: '#00ACED',
  brightBlue: '#00D2FF',
  charcoal: '#333333',
  darkGrey: '#6c757d',
  green: '#31D238',
  grey: '#e9ecef',
  orange: '#f47a3e',
  paleGrey: '#fafcff',
  pink: '#EF358A',
  purple: '#62358A',
  red: '#f15b60',
  yellow: '#FFAE00'
};

export const saloTheme = {
  primary: colours.blue,
  secondary: colours.pink,
  success: colours.green,
  error: colours.red,
  warning: colours.yellow,
  info: colours.grey,
  font: colours.charcoal,
  fontInverse: '#fff',
  bodyFont: '\'Brother\', sans-serif',
  headerFont: '\'Brother\', sans-serif',
  ...colours
};

/**
 * BOX SHADOW
 *
 * Centralised definition for shadows
 * @param {*} size - string value for the size. [default | medium, | large]
 * @returns box shadow css property string
 */
export const boxShadow = (size) => {
  switch (size) {
    case 'large':
    case 'small':
    case 'default':
    default:
      return '2px 2px 2px 0px rgba(0,0,0,0.2)';
  }
};

/**
 * BUTTON THEMES
 *
 * Definition for the button themes from the predefined colours
 */
export const buttonThemes = ({ primary, secondary, font, fontInverse, success, error }) => ({
  white: {
    border: '#fff',
    background: '#fff',
    color: font,
    borderHov: colours.paleGrey,
    backgroundHov: colours.paleGrey,
    colorHov: font,
    shadow: true
  },
  clear: {
    border: font,
    background: 'transparent',
    color: font,
    borderHov: font,
    backgroundHov: 'rgba(0,0,0,0.1)',
    colorHov: font,
    shadow: false
  },
  clear_inverse: {
    border: fontInverse,
    background: 'transparent',
    color: fontInverse,
    borderHov: darken(0.3, fontInverse),
    backgroundHov: 'transparent',
    colorHov: darken(0.3, fontInverse),
    shadow: false
  },
  text: {
    border: 'transparent',
    background: 'transparent',
    color: colours.darkGrey,
    borderHov: 'transparent',
    backgroundHov: 'transparent',
    colorHov: font,
    shadow: false
  },
  text_inverse: {
    border: 'transparent',
    background: 'transparent',
    color: colours.paleGrey,
    borderHov: 'transparent',
    backgroundHov: 'transparent',
    colorHov: fontInverse,
    shadow: false
  },
  primary: {
    border: primary,
    background: primary,
    color: fontInverse,
    borderHov: darken(0.15, primary),
    backgroundHov: darken(0.15, primary),
    colorHov: fontInverse,
    shadow: true
  },
  secondary: {
    border: secondary,
    background: secondary,
    color: fontInverse,
    borderHov: darken(0.15, secondary),
    backgroundHov: darken(0.15, secondary),
    colorHov: fontInverse,
    shadow: true
  },
  error: {
    border: error,
    background: error,
    color: fontInverse,
    borderHov: darken(0.15, error),
    backgroundHov: darken(0.15, error),
    colorHov: fontInverse,
    shadow: true
  },
  success: {
    border: success,
    background: success,
    color: fontInverse,
    borderHov: darken(0.15, success),
    backgroundHov: darken(0.15, success),
    colorHov: fontInverse,
    shadow: true
  }
});