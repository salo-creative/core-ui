import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Editor } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Editor', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['drop']
});

stories.add(
  'Basic',
  (() => {
    const limit = number('Character limit', 300);
    const value = text('Text', '<p>Hello, we are <a href="https://salocreative.co.uk">Salo Creative</a>.</p>');
    const placeholder = text('Placeholder', 'some \n\rmultiline text');

    return (
      <Editor
        placeholder={ placeholder }
        value={ value }
        onExport={ (output) => console.log(output) }
        limit={ limit }
      />
    );
  }),
  {
    notes: README,
    knobs: {
      escapeHTML: false
    }
  }
);