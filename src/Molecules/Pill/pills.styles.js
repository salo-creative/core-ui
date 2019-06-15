import styled from 'styled-components';
import { transparentize } from 'polished';

// HELPERS
import { boxShadow } from '../../helpers/colours';

export const PillWrapper = styled.div`
    border-radius: 5rem;
    display: inline-flex;
    align-items: center;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: ${ ({ theme, background }) => (theme[background] ? theme[background] : theme.primary) };
    color: ${ ({ theme, color, loading, background }) => (loading ? theme[background] : theme[color]) };
    font-size: 1.6rem;
    margin: ${ ({ margin }) => (margin || '0 0.5rem 0 0') };
    align-items: center;
    transition: all 0.3s linear;
    position: relative;
    box-shadow: ${ boxShadow() };
    path {
        transition: fill 0.3s linear;
        fill: ${ ({ loading, color, background, theme }) => (loading ? theme[background] : theme[color]) };
    }
`;

export const HiddenCloseButton = styled.button`
    background-color: transparent;
    visibility: ${ ({ loading }) => (loading ? 'hidden' : 'visible') };
    cursor: pointer;
    display: inline-flex;
    margin: 0;
    border: 0;
    padding: 0 0 0 1.5rem;
    height: 4rem;
    opacity: 0.6;
    transition: opacity 0.3s linear;
    &:hover {
        opacity: 1;
    }
`;