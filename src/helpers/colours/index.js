import { darken } from 'polished';

/**
 * COLOUR DEFINITIONS
 *
 * Fixed colour definitions to ensure
 * centralised definition of consts
 */
export const colours = {
  white: '#fff',
  black: '#00222b',
  blue: '#56c3f0',
  green: '#78d731',
  grey: '#e9ecef',
  darkGrey: '#6c757d',
  navy: '#00272e',
  orange: '#f9200',
  paleGrey: '#fafcff',
  red: '#ff190f',
  yellow: '#ffcc00'
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
export const buttonThemes = {
  white: {
    border: '#fff',
    background: '#fff',
    color: colours.black,
    borderHov: colours.paleGrey,
    backgroundHov: colours.paleGrey,
    colorHov: colours.black,
    shadow: true
  },
  clear: {
    border: colours.black,
    background: 'transparent',
    color: colours.black,
    borderHov: colours.black,
    backgroundHov: 'rgba(0,0,0,0.1)',
    colorHov: colours.black,
    shadow: false
  },
  clear_inverse: {
    border: '#fff',
    background: 'transparent',
    color: '#fff',
    borderHov: darken(0.3, '#fff'),
    backgroundHov: 'transparent',
    colorHov: darken(0.3, '#fff'),
    shadow: false
  },
  text: {
    border: 'transparent',
    background: 'transparent',
    color: colours.darkGrey,
    borderHov: 'transparent',
    backgroundHov: 'transparent',
    colorHov: colours.black,
    shadow: false
  },
  text_inverse: {
    border: 'transparent',
    background: 'transparent',
    color: colours.paleGrey,
    borderHov: 'transparent',
    backgroundHov: 'transparent',
    colorHov: '#fff',
    shadow: false
  },
  primary: {
    border: colours.blue,
    background: colours.blue,
    color: '#fff',
    borderHov: darken(0.15, colours.blue),
    backgroundHov: darken(0.15, colours.blue),
    colorHov: '#fff',
    shadow: true
  },
  secondary: {
    border: colours.navy,
    background: colours.navy,
    color: '#fff',
    borderHov: darken(0.15, colours.navy),
    backgroundHov: darken(0.15, colours.navy),
    colorHov: '#fff',
    shadow: true
  },
  error: {
    border: colours.red,
    background: colours.red,
    color: '#fff',
    borderHov: darken(0.15, colours.red),
    backgroundHov: darken(0.15, colours.red),
    colorHov: '#fff',
    shadow: true
  },
  success: {
    border: colours.green,
    background: colours.green,
    color: '#fff',
    borderHov: darken(0.15, colours.green),
    backgroundHov: darken(0.15, colours.green),
    colorHov: '#fff',
    shadow: true
  }
};

export const avatarThemes = {
  purple: {
    background: '#582A72',
    color: colours.white
  }
};