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
  &.isFixed {
    position: relative;
    z-index: ${ ({ zIndex }) => zIndex };
  }
`;

export const DropElement = styled.div`
  background-color: ${ ({ background }) => background };
  border-radius: ${ ({ borderRadius }) => borderRadius };
  border-top: ${ ({ border, borderTop }) => (borderTop ? border : 'none') };
  border: ${ ({ border }) => border };
  box-shadow: ${ ({ shadow }) => shadow };
  left: ${ ({ left }) => left };
  max-width: ${ ({ maxWidth }) => maxWidth };
  min-height: 4rem;
  min-width: 10rem;
  padding: ${ ({ padding }) => padding };
  position: ${ ({ fixed }) => (fixed ? 'fixed' : 'absolute') };
  top: ${ ({ top }) => top };
  transform: ${ ({ transform }) => transform };
  width: ${ ({ width }) => width };
  z-index: ${ ({ zIndex }) => zIndex };
  ${ ({ arrow, theme }) => {
    if (arrow) {
      return `
        &:before {
          border-bottom: ${ arrow.size } solid transparent;
          border-left: ${ arrow.size } solid ${ arrow.color || theme.grey };
          border-radius: 0.03rem 0 0 0;
          border-right: ${ arrow.size } solid transparent;
          border-top: ${ arrow.size } solid ${ arrow.color || theme.grey };
          box-shadow: ${ ({ shadow }) => shadow };
          content: '';
          height: 0;
          left: ${ arrow.offsetLeft };
          position: absolute;
          top: -${ arrow.size };
          transform: rotate(45deg);
          width: 0;
        }
        &:after {
          border-bottom: ${ arrow.size } solid transparent;
          border-left: ${ arrow.size } solid transparent;
          border-radius: 0.03rem 0 0 0;
          border-right: ${ arrow.size } solid transparent;
          border-top: ${ arrow.size } solid transparent;
          box-shadow: -1px -1px 1px 0 rgba(0,0,132,0.1);
          content: '';
          height: 0;
          left: ${ arrow.offsetLeft };
          position: absolute;
          top: -${ arrow.size };
          transform: rotate(45deg);
          width: 0;
        }
      `;
    }
    return '';
  } }
`;

export const DropContent = styled.div`
  width: 100%;
  max-height: ${ ({ maxHeight }) => maxHeight };
  ${ ({ disableOverflow }) => (disableOverflow ? '' : 'overflow-y: auto;') }
  position: relative;
  border-radius: ${ ({ borderRadius }) => borderRadius };

  ::-webkit-scrollbar {
    display: ${ ({ showScrollbar }) => (showScrollbar ? 'block' : 'none') };
    width: 1rem;
    position: absolute;
    right: 1rem;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    
    position: absolute;
  }
  ::-webkit-scrollbar-thumb {
    background: ${ ({ theme }) => theme.grey };
    border-radius: .3rem;
  }
`;