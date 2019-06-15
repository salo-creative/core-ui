import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0 0;
`;

export const Indicator = styled.div`
  transition: all 0.3s linear;
  display: flex;
  width: ${ ({ width }) => width };
  height: 0.5rem;
  background-color: ${ ({ color }) => color };
`;

export const Label = styled.p`
  margin: 0 1rem 0 0;
  font-size: 1.2rem;
`;