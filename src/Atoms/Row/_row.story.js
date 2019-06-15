import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Row } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Grid/Row', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['row'] });

stories.add(
  'Basic',
  (() => {
    const alignItems = select('Align items', {
      'Flex start': 'flex-start',
      'Flex end': 'flex-end',
      'Center': 'center',
      'Stretch': 'stretch',
      'Unset': 'unset'
    }, 'flex-start');
    const justifyContent = select('Justify content', {
      'Space between': 'space-between',
      'Center': 'center',
      'Flex start': 'flex-start',
      'Flex end': 'flex-end'
    }, 'flex-start');
    const flexWrap = select('Flex wrap', {
      'Wrap': 'wrap',
      'No wrap': 'no-wrap',
      'Wrap reverse': 'wrap-reverse'
    }, 'flex-start');
    const padding = text('Padding', '0 0 0 0');
    return (
      <Row
        alignItems={ alignItems }
        justifyContent={ justifyContent }
        flexWrap={ flexWrap }
        padding={ padding }
        style={ { background: '#eaeaea' } }
      >
        A lovely Row
      </Row>
    );
  }), { notes: README }
);