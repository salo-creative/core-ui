
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { H2, Column, P, Row } from '../../index';

// README //
import README from './README.md';

const stories = storiesOf('Helpers | Environments', module);

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
            <H2>Environment helpers</H2>
            <P>The environment helpers are designed to centralise the definitions of any environment specific variables, e.g. urls, keys etc and allow for simple builds of the applications. Most if not all of the environment helpers switch based on webpack variables defined within the applications webpack config. For storybook this environment variable is locked to local.</P>
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