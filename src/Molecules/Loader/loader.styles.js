import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: ${ ({ appearance }) => (appearance === 'light' ? '#fff' : 'linear-gradient(to bottom, #00222b, #003645)') };
`;