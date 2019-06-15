import styled from 'styled-components';
import { get } from 'lodash';

// HELPERS
import { buttonThemes, boxShadow } from '../../helpers/colours';

const getColour = ({ props, property }) => {
  return get(buttonThemes(props.theme), `${ props.appearance }.${ property }`);
};

export const ButtonWrapper = styled.button`
  display: inline-flex;
  background-color: ${ props => getColour({ property: 'background', props }) };
  border: 1px solid ${ props => getColour({ property: 'border', props }) };
  color: ${ props => (props.loading === 'true' ? getColour({ property: 'background', props }) : getColour({ property: 'color', props })) };
  transition: all 0.3s linear;
  position: relative;
  justify-content: ${ ({ align }) => align };
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: ${ ({ radius }) => (radius === 'true' ? '0.4rem' : '0') };
  font-size: 1.4rem;
  height: ${ ({ size }) => (size === 'L' ? '4.5rem' : '4rem') };
  padding: 0 1.5rem;
  width: ${ ({ fullwidth }) => (fullwidth === 'true' ? '100%' : 'auto') };
  box-shadow: ${ props => (getColour({ property: 'shadow', props }) ? boxShadow() : 'none') };
  path {
    transition: fill 0.3s linear;
    fill: ${ props => (props.loading === 'true' ? getColour({ property: 'background', props }) : getColour({ property: 'color', props })) } !important;
  }
  &:disabled {
    background-color: ${ props => getColour({ property: 'background', props }) } !important;
    border: 1px solid ${ props => getColour({ property: 'border', props }) };
    color: ${ props => (props.loading === 'true' ? getColour({ property: 'background', props }) : getColour({ property: 'color', props })) };
    opacity: 0.6;
    pointer-events: auto;
    cursor: not-allowed;
    path {
      fill: ${ props => (props.loading === 'true' ? getColour({ property: 'background', props }) : getColour({ property: 'color', props })) } !important;
    }
  }
  &:focus {
    outline: none
  }
  &:hover:not([disabled]) {
    border: 1px solid  ${ props => getColour({ property: 'borderHov', props }) };
    background: ${ props => getColour({ property: 'backgroundHov', props }) };
  }
  &.active,
  &:hover:not([disabled]) {
    color: ${ props => (props.loading === 'true' ? getColour({ property: 'backgroundHov', props }) : getColour({ property: 'colorHov', props })) };
    path {
      fill: ${ props => (props.loading === 'true' ? getColour({ property: 'backgroundHov', props }) : getColour({ property: 'colorHov', props })) } !important;
    }
  }
`;