import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Button, Row, Column } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Button', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['button'] });


const columnProps = { tablet: 6, medium: 4, large: 3, style: { border: '1px solid #fff', background: '#f2f3f4' } };

stories.add(
  'Basic',
  (() => {
    // KNOBS
    const appearance = select('appearance', {
      'Primary': 'primary',
      'Secondary': 'secondary',
      'Success': 'success',
      'Error': 'error',
      'White': 'white',
      'Clear': 'clear',
      'Clear Inverse': 'clear_inverse',
      'Text': 'text',
      'Text Inverse': 'text_inverse'
    }, 'primary');
    const type = select('Type', {
      'Button': 'button',
      'Submit': 'submit',
      'Link': 'Link',
      'A': 'a'
    }, 'button');
    const align = select('Align', {
      'Center': 'center',
      'Start': 'start',
      'Flex end': 'flex-end',
      'Space between': 'space-between'
    }, 'center');
    const iconBefore = text('Icon before', 'dashboard');
    const iconAfter = text('Icon after', '');
    const fullWidth = boolean('Display full width', false);
    const loading = boolean('Show loading state', false);
    const disabled = boolean('Show disabled state', false);
    const radius = boolean('Show radius', true);
    const size = select('size', ['L', 'M'], 'M');
    return (
      <React.Fragment>
        <Button
          appearance={ appearance }
          fullWidth={ fullWidth }
          loading={ loading }
          disabled={ disabled }
          iconBefore={ iconBefore }
          iconAfter={ iconAfter }
          radius={ radius }
          align={ align }
          size={ size }
          type={ type }
          to='/'
        >
          Button text
        </Button>
      </React.Fragment>
    );
  }),
  { info: { propTablesExclude: [React.Fragment] }, notes: README }
);

stories.add(
  'All styles',
  (() => {
    // KNOBS
    return (
      <React.Fragment>
        <Row margin='0 -10px 0'>
          <Column { ...columnProps }>
            <Button appearance='primary' fullWidth>Primary button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='secondary' fullWidth>Secondary button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='success' fullWidth>Success button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='error' fullWidth>Error button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='white' fullWidth>White button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='clear' fullWidth>Clear button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='clear_inverse' fullWidth>Clear Inverse button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='text' fullWidth>Text button</Button>
          </Column>
          <Column { ...columnProps }>
            <Button appearance='text_inverse' fullWidth>Text Inverse button</Button>
          </Column>
        </Row>
      </React.Fragment>
    );
  }),
  { info: { propTablesExclude: [React.Fragment, Column, Row] }, notes: README }
);