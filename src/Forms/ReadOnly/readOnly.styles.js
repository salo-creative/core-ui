import styled from 'styled-components';

export const Text = styled.p`
  min-height: 4rem;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin: ${ ({ margin }) => margin };
  strong {
    margin-right: 2rem;
    text-transform: capitalize;
  }
`;