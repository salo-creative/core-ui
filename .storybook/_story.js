import React from 'react';
import styled from 'styled-components';

import changes from './changelog.json';
import { H1, H2, Ol, P, Container, Row, Column, Ul } from '../src';

// styled components
const Wrapper = styled.div`
  border: 10px solid #333;
  min-height: 100vh;

  *:not(li) > *:not(li):not(:first-child) {
    margin-top: 20px;
  }

  *:not(li) > h2:not(:first-child) {
    margin-top: 45px;
  }
`;

const StyledH1 = styled(H1)`
  text-transform: uppercase;
  background: #333;
  color: #fff;
  text-align: center;
  padding: 25px;
`;

export const Changelog = () => {
  const users = {};
  changes.forEach(change => {
    if (users[change.user] !== undefined) {
      users[change.user].count++;
    } else {
      users[change.user] = {
        count: 0,
        name: change.user,
      };
      users[change.user].count++;
    }
  });

  return (
    <React.Fragment>
      <StyledH1>UI changelog</StyledH1>
      <Wrapper>
        <Container padding='25px'>
          <Row>
            <Column>
              {changes.map(change => {
                return (
                  <P margin="0" key={change.version}>
                    <strong>{change.version} - </strong>
                    {change.commit}
                    {change.user && ` (${change.user})`}
                  </P>
                );
              })}
            </Column>
          </Row>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
};

Changelog.story = {
  parameters: {
    info: {
      disable: true,
    },
    options: { showPanel: false },
  },
};

export const Approach = () => (
  <React.Fragment>
    <StyledH1>Ui approach</StyledH1>
    <Wrapper>
      <Container padding='25px'>
        <Row>
          <Column>
            <Ul>
              <li>
                The ui approach is in part based on the atomic design system. Atoms, molecules and
                forms are a conceptual split between simple and complex components.
              </li>
              <li>
                Each atom is created and styled in isolation, this means that no ‘external’ spacing
                should be included. It is recommended that spacing is added on a per project basis,
                preferably using the Grid or Flex family of components.
              </li>
              <li>
                If a molecule or form component does not fit a pattern used within a project you
                should create a new molecule within that project. E.g. if a label is inline with the
                input, the <code>&lt;InputField&gt;</code> does not support this. So within the
                project a new molecule needs to be created using the atoms from ui.
              </li>
              <li>
                Common patterns used across many applications can be added into the patterns section
                of storybook. This will then act as a helpful reference for other users of the ui.
              </li>
              <li>
                Components with text within them must accept a translated strings object to override
                text. The project should handle the translations not the components.
              </li>
              <li>
                Make sure you extend existing components as opposed to create entirely new versions
                if you only need to slightly modify existing styles. If it is likely the style needs
                to be managed in multiple use cases make it accessible as a prop.
              </li>
              <li>
                If you need to use the styles of a component on a different DOM element make sure to
                use the <code>as</code> prop
              </li>
              <li>
                For full guides on using styled components see the styled components{' '}
                <a href="https://www.styled-components.com/docs/basics" target="_blank">
                  docs
                </a>
              </li>
            </Ul>
          </Column>
        </Row>
      </Container>
    </Wrapper>
  </React.Fragment>
);

Approach.story = {
  parameters: {
    info: {
      disable: true,
    },
    options: { showPanel: false },
  },
};

export const Test = () => (
  <React.Fragment>
    <StyledH1>Ui Testing</StyledH1>
    <Wrapper>
      <Container padding='25px'>
        <Row>
          <Column>
            <H2>Atoms:</H2>
            <Ol>
              <li>
                <P>A snapshot for all atoms must be produced.</P>
              </li>
              <li>
                <P>Default prop styling should be tested alongside the snapshot.</P>
              </li>
              <li>
                <P>Prop changes must be tested.</P>
              </li>
              <li>
                <P>
                  Any atom with interactive behaviours e.g. <code>&lt;Button&gt;</code> or{' '}
                  <code>&lt;Input&gt;</code> must be tested using simulated actions.
                </P>
              </li>
            </Ol>
            <H2>Molecules and Forms:</H2>
            <Ol>
              <li>
                <P>Atom behaviour is not expected to be tested.</P>
              </li>
              <li>
                <P>
                  Any internal or custom components must be tested. E.g.{' '}
                  <code>&lt;InputField&gt;</code> has internal logic to show an error message, this
                  behaviour must be tested.
                </P>
              </li>
              <li>
                <P>Any component which has text must be tested with alternate language prop</P>
              </li>
            </Ol>
          </Column>
        </Row>
      </Container>
    </Wrapper>
  </React.Fragment>
);

Test.story = {
  parameters: {
    info: {
      disable: true,
    },
    options: { showPanel: false },
  },
};

export default {
  title: 'Meta'
}