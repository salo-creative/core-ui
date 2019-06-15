import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Ul } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Typography/Ul', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['ul'] });

stories.add(
  'Basic',
  (() => {
    const fontSize = text('Font size', '');
    const lineHeight = text('Line height', '');
    const colour = color('Colour', '#262729');
    const margin = text('Margin', '0 0 20px');
    return (
      <Ul
        color={ colour }
        fontSize={ fontSize }
        lineHeight={ lineHeight }
        margin={ margin }
      >
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
        <li>Nunc dignissim risus id metus.</li>
        <li><p>Cras ornare tristique elit.</p></li>
        <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>
        <li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>
      </Ul>
    );
  }), { notes: README }
);