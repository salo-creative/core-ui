import styled from 'styled-components';
import Container from '../../Atoms/Container';

export const ErrorContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${ ({ padding }) => padding }
`;