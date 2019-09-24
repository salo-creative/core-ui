import styled, { css, keyframes } from 'styled-components';

// HELPERS
import { boxShadow } from '../../helpers/colours';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const PillWrapper = styled.div`
    background-color: ${ ({ theme, background }) => (theme[background] ? theme[background] : theme.primary) };
    border: ${ ({ border }) => border };
    border-radius: 5rem;
    box-shadow: ${ ({ shadow }) => shadow || boxShadow() };
    color: ${ ({ theme, color, loading, background, inlineLoader }) => (!inlineLoader && loading ? theme[background] : theme[color]) };
    display: inline-flex;
    font-size: ${ ({ fontSize }) => fontSize };
    margin: ${ ({ margin }) => (margin || '0 0.5rem 0 0') };
    padding: ${ ({ padding }) => padding };
    position: relative;
    transition: all 0.3s linear;

    path {
        fill: ${ ({ loading, color, background, theme, inlineLoader }) => (!inlineLoader && loading ? theme[background] : theme[color]) };
        transition: fill 0.3s linear;
    }
`;

export const HiddenButton = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: inline-flex;
    margin: 0;
    min-width: 2rem;
    opacity: 0.6;
    padding: 0;
    transition: opacity 0.3s linear;
    visibility: ${ ({ isLoading, inlineLoader }) => (!inlineLoader && isLoading ? 'hidden' : 'visible') };

    &:hover {
        opacity: 1;
    }

    svg {
        transform-origin: center center;
        ${ ({ isLoading }) => (isLoading ? css`animation: ${ rotate } 2s linear infinite;` : '') }
    }
`;

export const Text = styled.span`
  margin-right: 1.5rem;
`;