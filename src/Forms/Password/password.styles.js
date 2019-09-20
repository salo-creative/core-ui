import styled from 'styled-components';

export const HelperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: -1rem 0 3rem;
`;

export const ValidationLabel = styled.p`
  font-size: 1.2rem;
  margin: 0 0 1rem;
`;

export const ValidationRules = styled.span`
  display: flex;
  height: 2rem;
  font-size: 1.2rem;
  align-items: center;
  &.valid {
    color: ${ ({ theme }) => theme.primary };
    svg path {
      fill: ${ ({ theme }) => theme.primary };
    }
  }
`;