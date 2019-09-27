// STYLED COMPONENTS
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export const UploaderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  background: #8F8F8F;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: ${ ({ setHeight, setWidth }) => ((setHeight / setWidth) * 100) }%;
  }
`;

export const UploaderDropZone = styled(Dropzone)`
  position: absolute !important;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
`;

export const UploaderZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
  flex: 1 0 auto;

  ${ ({ accepted }) => {
    if (accepted === 'accepted') {
      return `
      border: 5px solid #00A44C;

      span {
        background: #00A44C;
      }
    `;
    }
    if (accepted === 'not-accepted') {
      return `
      border: 5px solid #d0021b;

      span {
        background: #d0021b;
      }
    `;
    }
    return null;
  } }
`;

export const UploaderLabel = styled.span`
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  padding: 5px 10px;
  display: inline-block;
  font-size: 1.5em;
  line-height: 1.2em;
`;