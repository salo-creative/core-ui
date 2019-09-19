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
    align-items: center;
    background-color: ${ ({ theme, background }) => (theme[background] ? theme[background] : theme.primary) };
    border: ${ ({ border }) => border };
    border-radius: 5rem;
    box-shadow: ${ ({ shadow }) => shadow || boxShadow() };
    color: ${ ({ theme, color, loading, background, inlineLoader }) => (!inlineLoader && loading ? theme[background] : theme[color]) };
    display: inline-flex;
    font-size: ${ ({ fontSize }) => fontSize };
    height: ${ ({ height }) => height };
    margin: ${ ({ margin }) => (margin || '0 0.5rem 0 0') };
    padding: 0 ${ ({ padding }) => padding };
    position: relative;
    transition: all 0.3s linear;

    path {
        fill: ${ ({ loading, color, background, theme, inlineLoader }) => (!inlineLoader && loading ? theme[background] : theme[color]) };
        transition: fill 0.3s linear;
    }
`;

export const HiddenButton = styled.button`
    background-color: transparent;
    visibility: ${ ({ isLoading, inlineLoader }) => (!inlineLoader && isLoading ? 'hidden' : 'visible') };
    cursor: pointer;
    display: inline-flex;
    margin: 0;
    border: 0;
    padding: 0 0 0 ${ ({ padding }) => padding };
    height: 4rem;
    opacity: 0.6;
    transition: opacity 0.3s linear;

    &:hover {
        opacity: 1;
    }

    svg {
        transform-origin: center center;
        ${ ({ isLoading }) => (isLoading ? css`animation: ${ rotate } 2s linear infinite;` : '') }
    }
`;