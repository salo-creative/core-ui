import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  height: ${ ({ height }) => height || 'auto' };
  flex-direction: column;
  transition: max-height 0.3s linear;
  max-height: 100rem;
  &.collapsed {
    max-height: 10rem;
    overflow: hidden;
    justify-content: center;
  }
`;