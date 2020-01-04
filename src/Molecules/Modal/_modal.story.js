import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import {
  withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENTS //
import { Modal } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Modal', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['modal']
});

stories.add(
  'Basic',
  (() => {
    // KNOBS
    const open = boolean('Open', true);
    const closeOnBackdrop = boolean('closeOnBackdrop', true);
    const closeOnEsc = boolean('closeOnEsc', true);
    const hideClose = boolean('hideClose', false);
    const hideHeader = boolean('hideHeader', false);
    const title = text('Modal title', 'Modal title');
    const transition = select('Transition', {
      'fade': 'fade',
      'slide': 'slide'
    }, 'fade');
    const background = text('background', null);
    return (
      <Modal
        hideClose={ hideClose }
        hideHeader={ hideHeader }
        closeOnEsc={ closeOnEsc }
        closeOnBackdrop={ closeOnBackdrop }
        title={ title }
        open={ open }
        onClose={ () => alert('Close modal function called') }
        transition={ transition }
        background={ background }
      />
    );
  }),
  {
    notes: README
  }
);

stories.add(
  'Input as child',
  (() => {
    // KNOBS
    const open = boolean('Open', true);
    const showInput = boolean('Show input', true);
    const showTextarea = boolean('Show textarea', false);
    return (
      <Modal
        open={ open }
        onClose={ () => alert('Close modal function called') }
      >
        { showTextarea && <textarea placeholder='textarea' /> }
        { showInput && <input placeholder='text input' /> }
      </Modal>
    );
  }),
  {
    notes: README
  }
);