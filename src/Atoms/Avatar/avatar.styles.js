import styled from 'styled-components';

export const AvatarWrapper = styled.button.attrs(({ image, cursor }) => ({
  style: {
    backgroundImage: image ? `url('${ image }')` : 'none',
    cursor
  }
}))`
  flex-shrink: 0;
  font-size: ${ ({ size }) => `${ size }px` };
  width: 1em;
  height: 1em;
  position: relative;
  border: none;
  background: ${ ({ background }) => background };
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0;
  margin: 0;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const TextWrapper = styled.p`
  font-size: 0.4em;
  ${ ({ theme, colour }) => {
    if (colour) {
      return `color: ${ colour };`;
    }
    return `
      color: ${ theme.font };
      mix-blend-mode: difference;
    `;
  } };
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  user-select: none;
  margin: 0;
`;