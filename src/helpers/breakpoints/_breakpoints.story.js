
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { H2, Column, P, Row } from '../../index';

// README //
import README from './README.md';

const stories = storiesOf('Helpers | Breakpoints', module);

// STYLES
const Wrapper = styled.div`
  padding: 10px;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

stories.add(
  'Basic',
  () => {
    return (
      <React.Fragment>
        <Row>
          <Column>
            <H2>Breakpoint helpers</H2>
            <P>The breakpoint helpers are designed to centralise the definitions of the breakpoint widths as well as provider a helper function for use inside styled components to programatically generate the required css.</P>
            <P>For full details see the README in the notes tab above</P>
          </Column>
        </Row>
      </React.Fragment>
    );
  },
  {
    options: { showPanel: true },
    info: {
      source: false,
      propTablesExclude: [Wrapper, Column, H2, Row, React.Fragment, P]
    },
    notes: README
  }
);