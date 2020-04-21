import React from 'react';

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
export const Basic = () => {
  // KNOBS
  const open = boolean('Open', true);
  const closeOnBackdrop = boolean('closeOnBackdrop', true);
  const closeOnEsc = boolean('closeOnEsc', true);
  const hideClose = boolean('hideClose', false);
  const hideHeader = boolean('hideHeader', false);
  const title = text('Modal title', 'Modal title');
  const transition = select(
    'Transition',
    {
      fade: 'fade',
      slide: 'slide',
      expand: 'expand'
    },
    'fade'
  );
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
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['modal'],
    notes: README
  }
};

export const InputAsChild = () => {
  // KNOBS
  const open = boolean('Open', true);
  const showInput = boolean('Show input', true);
  const showTextarea = boolean('Show textarea', false);
  return (
    <Modal open={ open } onClose={ () => alert('Close modal function called') }>
      { showTextarea && <textarea placeholder='textarea' /> }
      { showInput && <input placeholder='text input' /> }
    </Modal>
  );
};

InputAsChild.story = {
  name: 'Input as child',
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['modal'],
    notes: README
  }
};

export default {
  title: 'Molecules/Modal'
};