import React from 'react';
import { storiesOf } from '@storybook/react';

// FEATURED COMPONENT
import { Editor } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Editor', module);

stories.add(
  'Basic',
  (() => {
    return (
      <Editor
        placeholder={ 'some \n\rmultiline text' }
        value='<p>sdf sdf <a href="https://facebook.com">sdf</a> sdf&nbsp;</p>'
        onExport={ ({ html }) => console.log(html) }
      />
    );
  }),
  {
    
    notes: README
  }
);