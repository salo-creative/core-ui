import styled from 'styled-components';

// HELPERS
import { boxShadow } from '../../helpers/colours';

export const PillWrapper = styled.div`
    align-items: center;
    background-color: ${ ({ theme, background }) => (theme[background] ? theme[background] : theme.primary) };
    border: ${ ({ border }) => border };
    border-radius: 5rem;
    box-shadow: ${ ({ shadow }) => shadow || boxShadow() };
    color: ${ ({ theme, color, loading, background }) => (loading ? theme[background] : theme[color]) };
    display: inline-flex;
    font-size: 1.6rem;
    height: ${ ({ height }) => height };
    margin: ${ ({ margin }) => (margin || '0 0.5rem 0 0') };
    padding: 0 ${ ({ padding }) => padding };
    position: relative;
    transition: all 0.3s linear;
    
    path {
        fill: ${ ({ loading, color, background, theme }) => (loading ? theme[background] : theme[color]) };
        transition: fill 0.3s linear;
    }
`;

export const HiddenButton = styled.button`
    background-color: transparent;
    visibility: ${ ({ loading }) => (loading ? 'hidden' : 'visible') };
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
`;