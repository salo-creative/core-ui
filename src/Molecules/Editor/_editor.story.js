import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Editor } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Editor', module);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['drop']
});

stories.add(
  'Basic',
  (() => {
    return (
      <Editor
        placeholder={ 'some \n\rmultiline text' }
        value='<p>Hello, we are <a href="https://salocreative.co.uk">Salo Creative</a>.</p>'
        onExport={ ({ html }) => console.log(html) }
      />
    );
  }),
  {
    notes: README
  }
);