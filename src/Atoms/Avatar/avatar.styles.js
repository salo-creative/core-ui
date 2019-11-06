import styled from 'styled-components';

export const AvatarWrapper = styled.button`
  font-size: ${ ({ size }) => `${ size }px` };
  width: 1em;
  height: 1em;
  position: relative;
  border: none;
  background: ${ ({ background }) => background };
  cursor: ${ ({ cursor }) => cursor };
  background-image: url('${ ({ image }) => image }');
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
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
  color: ${ ({ theme }) => theme.font };
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  user-select: none;
  margin: 0;
  mix-blend-mode: difference;
`;