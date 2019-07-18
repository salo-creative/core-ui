
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { H2, Column, P, Row } from '../../index';

// README //
import README from './README.md';

const stories = storiesOf('Helpers | Auth', module);

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
            <H2>Auth helpers</H2>
            <P>The auth helpers are here to simplify the token handling and expiry management of the JWT and user cookies that underpin the auth system. The auth system itself and the various permission checking functions are documented in the auth section of storybook as these functions are exposed via the AuthProvider and its context</P>
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