import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${ ({ height }) => height || 'auto' };
  margin: ${ ({ margin }) => margin };
  max-width: ${ ({ width }) => width };
  &.collapsed {
    justify-content: center;
    max-height: 10rem;
    overflow: hidden;
  }
`;