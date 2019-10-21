
import styled from 'styled-components';

export const AlertsContainer = styled.div`
  position: fixed;
  top: ${ ({ topOffset }) => topOffset }px;
  left: 0;
  width: 100%;
  z-index: 101;
  ${ ({ styleString }) => styleString }
`;