import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${ ({ height }) => height || 'auto' };
  margin: ${ ({ margin }) => margin };
  transition: max-height 0.3s linear;
  width: ${ ({ width }) => width };
  &.collapsed {
    justify-content: center;
    max-height: 10rem;
    overflow: hidden;
  }
`;