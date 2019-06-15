import styled from 'styled-components';

// HELPERS
import { boxShadow } from '../../helpers/colours';

export const CardWrapper = styled.div`
  background: ${ ({ background }) => background };
  border-radius: ${ ({ borderRadius }) => borderRadius };
  box-shadow: ${ boxShadow() };
  margin: ${ ({ margin }) => margin };
  overflow: hidden;
  padding: ${ ({ padding }) => padding };
  width: 100%;
`;