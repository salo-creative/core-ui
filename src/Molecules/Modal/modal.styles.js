import styled from 'styled-components';

export const ModalWrapper = styled.div`
  ${ ({ state }) => {
    return `
      .salo-modal__backdrop {
        opacity: ${ state === 'entered' ? 1 : 0 };
        transition: opacity 300ms cubic-bezier(0.470, 0.000, 0.745, 0.715);
      }
    `;
  } }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 97;
  top: 0%;
  height: 100%;
  ${ ({ transition, state }) => {
    switch (transition) {
      case 'slide':
        return `
          top: ${ state === 'entered' ? 0 : '-100%' };
          transition: top 300ms cubic-bezier(0.470, 0.000, 0.745, 0.715);
        `;
      case 'expand':
        return `
          height: ${ state === 'entered' ? '100%' : 0 };
          transition: height 300ms cubic-bezier(0.470, 0.000, 0.745, 0.715);
          overflow: hidden;
        `;
      case 'fade':
      default:
        return `
          opacity: ${ state === 'entered' ? 1 : 0 };
          transition: opacity 300ms cubic-bezier(0.470, 0.000, 0.745, 0.715);
        `;
    }
  } }
  
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ ({ outerPadding }) => (outerPadding ? '20px' : null) };
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 96;
  width: 100%;
  height: 100%;
  background-color: ${ ({ background }) => (background || `rgba(0, 0, 0, ${ ({ transparent }) => transparent })`) } ;
`;

export const Wrapper = styled.div`
  position: relative;
  background: ${ ({ bodyBackground }) => bodyBackground };
  z-index: 97;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  max-width: ${ ({ setWidth }) => setWidth };

  ${ ({ forceHeight, setHeight }) => (forceHeight ? `
    height: ${ setHeight };

    @media (max-height: ${ setHeight }) {
      max-height: 100%;
    }
  ` : `
    max-height: ${ setHeight };

    @media (max-height: ${ setHeight }) {
      max-height: 100%;
    }
  `) }

  @media (max-width: ${ ({ mobileFullscreen }) => mobileFullscreen }) {
    min-height: 100%;
    max-width: none;
    display: flex;
    flex-direction: column;
  }
`;

export const HeaderWrapper = styled.div`
  ${ ({ sticky }) => (sticky ? `
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
  ` : `
    position: relative;
  `) }

  z-index: 10;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #EAEAEA;
  text-align: center;
  padding: 0 2rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Close = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  position: absolute;
  right: 1rem;
  opacity: 0.7;
  line-height: 0;
  top: ${ ({ top }) => top };
  transform: ${ ({ top }) => (top === '50%' ? 'translateY(-50%)' : '') };
  z-index: 1;
  &:hover {
    opacity: 1;
  }
`;

export const Title = styled.h5`
  margin: 0;
  font-weight: 300;
  font-size: 1.6rem;
  letter-spacing: 1px;
`;

export const Body = styled.div`
  flex: 1;
  ${ ({ padding }) => (padding ? 'padding: 2rem;' : '') }
`;

export const Footer = styled.div`
  z-index: 10;
  width: 100%;
  background: #fff;
  border-top: 1px solid ${ ({ theme }) => theme.grey };

  ${ ({ sticky }) => (sticky ? `
    position: relative;
    position: sticky;
    bottom: 0;
    left: 0;
  ` : `
    position: relative;
  `) }
`;