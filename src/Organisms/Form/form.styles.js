import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  height: ${ ({ height }) => height || 'auto' };
  flex-direction: column;
  &.loading {
    overflow: hidden;
    justify-content: center;
  }
`;