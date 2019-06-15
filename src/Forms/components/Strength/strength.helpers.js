import { darken } from 'polished';

// HELPERS & CONSTANTS
import { colours } from '../../../helpers/colours';

const hasNumber = value => {
  return new RegExp(/[0-9]/).test(value);
};

const hasMixed = value => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};

const hasSpecial = value => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

export const calculateStrength = value => {
  let strengths = 0;

  if (value.length > 5) {
    strengths++;
  }
      
  if (value.length > 7) {
    strengths++;
  }
        
  if (hasNumber(value)) {
    strengths++;
  }
        
  if (hasSpecial(value)) {
    strengths++;
  }
        
  if (hasMixed(value)) {
    strengths++;
  }
    
  return strengths;
};

export const evalColour = count => {
  switch (count) {
    case 5:
      return darken(0.1, colours.green);
    case 4:
      return colours.green;
    case 3:
      return colours.yellow;
    case 2:
      return colours.orange;
    default:
      return colours.red;
  }
};