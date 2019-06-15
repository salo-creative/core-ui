import styled from 'styled-components';

export const DropBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${ ({ zIndex }) => zIndex };
  background-color: ${ ({ transparent }) => (transparent ? 'transparent;' : 'rgba(0,0,0,0.5);') };
  width: 100%;
  height: 100%;
`;

const visibleState = ['entered', 'entering'];

export const Wrapper = styled.div`
  transition: opacity 200ms ease-in-out;
  opacity: ${ ({ transition }) => (visibleState.includes(transition) ? 1 : 0) };
`;

export const DropElement = styled.div`
  position: ${ ({ fixed }) => (fixed ? 'fixed' : 'absolute') };
  z-index: ${ ({ zIndex }) => zIndex };
  top: ${ ({ top }) => top };
  transform: ${ ({ transform }) => transform };
  left: ${ ({ left }) => left };
  width: ${ ({ width }) => width };
  max-width: ${ ({ maxWidth }) => maxWidth };
  min-width: 10rem;
  min-height: 4rem;
  background-color: ${ ({ background }) => background };
  overflow: hidden;
  padding: ${ ({ padding }) => padding };
  border: ${ ({ border }) => border };
  border-top: ${ ({ border, borderTop }) => (borderTop ? border : 'none') };
  box-shadow: ${ ({ shadow }) => shadow };
`;

export const DropContent = styled.div`
  width: 100%;
  max-height: ${ ({ maxHeight }) => maxHeight };
  ${ ({ disableOverflow }) => (disableOverflow ? '' : 'overflow-y: scroll;') }
`;