import React from 'react';
import {
  withKnobs, boolean, select, object
} from '@storybook/addon-knobs';
import styled from 'styled-components';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Loader } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0;
`;

export const Basic = () => {
  // KNOBS
  const appearance = select(
    'Appearance',
    {
      Dark: 'dark',
      Light: 'light'
    },
    'dark'
  );
  const type = select(
    'Type',
    {
      Pulse: 'pulse',
      Bar: 'bar'
    },
    'pulse'
  );
  const display = boolean('Display loader', true);
  const takeover = boolean('Display full page takeover', false);
  const loaderProps = object('Loader props', {
    position: 'static',
    size: 100
  });
  return (
    <Wrapper>
      <Loader
        type={ type }
        takeover={ takeover }
        appearance={ appearance }
        display={ display }
        loaderProps={ loaderProps }
      />
    </Wrapper>
  );
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    est: ['loader'],
    info: {
      propTablesExclude: [Wrapper]
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Loader'
};