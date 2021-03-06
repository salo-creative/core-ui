import styled from 'styled-components';
import { transparentize } from 'polished';

export const TextAreaWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  margin: ${ ({ margin }) => margin };
`;

export const Field = styled.textarea`
  margin: 0;
  padding: 1rem;
  background: ${ ({ theme }) => theme.paleGrey };
  border: 1px solid;
  border-color: ${ ({ theme }) => transparentize(0.5, theme.primary) };
  transition: border 0.2s linear;
  width: 100%;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  &:focus,
  &:active {
    border-color: ${ ({ theme }) => theme.primary }
  }
  &[disabled] {
    cursor:  not-allowed;
    opacity: 0.75;
  }
`;