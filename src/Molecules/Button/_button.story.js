import React from 'react';
import {
  withKnobs, boolean, select, text
} from '@storybook/addon-knobs';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Button, Row, Column } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const columnProps = {
  tablet: 6,
  medium: 4,
  large: 3,
  style: {
    border: '1px solid #fff', background: '#f2f3f4'
  }
};

export const Basic = () => {
  // KNOBS
  const appearance = select(
    'appearance',
    {
      Primary: 'primary',
      Secondary: 'secondary',
      Success: 'success',
      Error: 'error',
      White: 'white',
      Clear: 'clear',
      'Clear Inverse': 'clear_inverse',
      Text: 'text',
      'Text Inverse': 'text_inverse'
    },
    'primary'
  );
  const type = select(
    'Type',
    {
      Button: 'button',
      Submit: 'submit',
      Link: 'Link',
      A: 'a'
    },
    'button'
  );
  const align = select(
    'Align',
    {
      Center: 'center',
      Start: 'start',
      'Flex end': 'flex-end',
      'Space between': 'space-between'
    },
    'center'
  );
  const iconBefore = text('Icon before', 'dashboard');
  const buttonText = text('Button text', 'Button text');
  const iconAfter = text('Icon after', '');
  const fullWidth = boolean('Display full width', false);
  const loading = boolean('Show loading state', false);
  const circle = boolean('Show circle state', false);
  const disabled = boolean('Show disabled state', false);
  const radius = boolean('Show radius', true);
  const height = text('height', '4rem');
  return (
    <React.Fragment>
      <Button
        appearance={ appearance }
        circle={ circle }
        fullWidth={ fullWidth }
        loading={ loading }
        disabled={ disabled }
        iconBefore={ iconBefore }
        iconAfter={ iconAfter }
        radius={ radius }
        align={ align }
        height={ height }
        type={ type }
        to='/'
      >
        { buttonText }
      </Button>
    </React.Fragment>
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
    jest: ['button'],
    info: {
      propTablesExclude: [React.Fragment]
    },
    notes: README
  }
};

export const AllStyles = () => {
  // KNOBS
  return (
    <React.Fragment>
      <Row margin='0 -10px 0'>
        <Column { ...columnProps }>
          <Button appearance='primary' fullWidth>
            Primary button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='secondary' fullWidth>
            Secondary button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='success' fullWidth>
            Success button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='error' fullWidth>
            Error button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='white' fullWidth>
            White button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='clear' fullWidth>
            Clear button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='clear_inverse' fullWidth>
            Clear Inverse button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='text' fullWidth>
            Text button
          </Button>
        </Column>
        <Column { ...columnProps }>
          <Button appearance='text_inverse' fullWidth>
            Text Inverse button
          </Button>
        </Column>
      </Row>
    </React.Fragment>
  );
};

AllStyles.story = {
  name: 'All styles',
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['button'],
    info: {
      propTablesExclude: [React.Fragment, Column, Row]
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Button'
};