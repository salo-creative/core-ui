import styled from 'styled-components';
import { transparentize } from 'polished';

export const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  margin: ${ ({ margin }) => margin };
`;

export const FieldWrapper = styled.div`
  position: relative;
`;

export const Trigger = styled.div`
  position: relative;

`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Field = styled.input`
  margin: 0;
  padding: ${ ({ padding }) => padding };
  height: ${ ({ height }) => height };
  background-color: ${ ({ background, error, theme }) => (error ? transparentize(0.7, theme.error) : background) };
  transition: border 0.2s linear;
  width: 100%;
  font-size: ${ ({ fontSize }) => fontSize };

  &:focus,
  &:active {
    border-color: ${ ({ theme }) => theme.primary }
  }

  &[disabled] {
    cursor:  not-allowed;
    opacity: 0.75;
  }
`;