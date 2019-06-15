import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: 5rem;
  margin: ${ ({ margin }) => margin };
  background: ${ ({ theme }) => theme.grey };
  border-radius: 0.4rem;
  padding: 0 1rem;
`;

export const ItemWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.4rem;
  a {
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${ ({ theme }) => darken(0.2, theme.blue) };
    transition: color 0.3s linear;
    &:hover {
      color: ${ ({ theme }) => theme.blue };
    }
  }
`;

export const Divider = styled.span`
  color: ${ ({ theme }) => theme.darkGrey };
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
`;