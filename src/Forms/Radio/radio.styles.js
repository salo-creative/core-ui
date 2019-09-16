import styled from 'styled-components';
import { transparentize } from 'polished';

// Container
export const Wrapper = styled.div`
  margin: ${ ({ margin }) => margin };
`;

export const Group = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  margin: ${ ({ margin }) => margin };
`;

export const GroupWrapper = styled.div`
  padding: 1rem;
  background: ${ ({ theme }) => theme.paleGrey };
  border: 0.1rem solid;
  border-color: ${ ({ theme }) => transparentize(0.5, theme.primary) };
  border-radius: 0.4rem;
`;