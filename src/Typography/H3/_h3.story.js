import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, select, color } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { H3 } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Typography/H3', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['h3'] });

stories.add(
  'Basic',
  (() => {
    const align = select('Align', {
      'Left': 'left',
      'Right': 'right',
      'Center': 'center'
    }, 'center');
    const fontSize = text('Font size', '');
    const colour = color('Colour', '#262729');
    const margin = text('Margin', '30px 0 10px');
    return (
      <H3
        color={ colour }
        fontSize={ fontSize }
        align={ align }
        margin={ margin }
      >
        H3 Headline <br /> With a second line
      </H3>
    );
  }), { notes: README }
);