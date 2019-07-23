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

export const Field = styled.input`
  margin: 0;
  padding: ${ ({ padding }) => padding };
  height: ${ ({ height }) => height };
  background-color: ${ ({ background, error, theme }) => (error ? transparentize(0.7, theme.error) : background) };
  border: ${ ({ border }) => border };
  border-color: ${ ({ theme, error }) => (error ? transparentize(0.3, theme.error) : transparentize(0.5, theme.blue)) };
  transition: border 0.2s linear;
  width: 100%;
  border-radius: ${ ({ borderRadius }) => borderRadius };
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