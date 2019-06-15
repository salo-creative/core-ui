
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { colours, H2, Column, P, Row, boxShadow } from '../../index';

// README //
import README from './README.md';
import README_SHADOW from './README_SHADOW.md';

const stories = storiesOf('Helpers | Colours', module);

// STYLES
const Wrapper = styled.div`
  padding: 10px;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledP = styled(P)`
  text-align: right;
  mix-blend-mode: difference;
`;

const Card = styled.div`
  box-shadow: ${ ({ shadow }) => shadow };
  width: 100%;
  margin: 0 0 20px;
`;

stories.add(
  'Colours',
  () => {
    return (
      <React.Fragment>
        <Row>
          { Object.keys(colours).map(key => {
            if (!colours[key].includes('#')) return null;
            return (
              <Column default={ 12 } tablet={ 6 } medium={ 4 } large={ 3 } key={ key }>
                <Wrapper style={ { background: colours[key] } }>
                  <StyledP>
                    { key } <br />
                    <strong>{ colours[key] }</strong>
                  </StyledP>
                </Wrapper>
              </Column>
            );
          }) }
        </Row>
      </React.Fragment>
    );
  },
  {
    options: { showPanel: true },
    info: {
      inline: true,
      source: false,
      propTablesExclude: [StyledP, Wrapper, Column, H2, Row, React.Fragment, Card]
    },
    notes: README
  }
);

stories.add(
  'Box Shadow',
  () => {
    return (
      <React.Fragment>
        <Card shadow={ boxShadow('default') }>
          <p style={ { padding: '20px', fontSize: '16px' } }>boxShadow('default') || boxShadow()</p>
        </Card>
      </React.Fragment>
    );
  },
  {
    options: { showPanel: true },
    info: {
      inline: true,
      source: false,
      propTablesExclude: [StyledP, Wrapper, Column, H2, Row, React.Fragment, Card]
    },
    notes: README_SHADOW
  }
);