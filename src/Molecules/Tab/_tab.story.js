import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Tab } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  return (
    <Tab
      panes={ [
        {
          title: 'Sawtooth',
          render: () => {
            return (
              <p>
                The sawtooth wave (or saw wave) is a kind of non-sinusoidal waveform. It is so named
                based on its resemblance to the teeth of a plain-toothed saw with a zero rake angle.
              </p>
            );
          }
        },
        {
          title: 'Sine',
          render: () => {
            return (
              <p>
                A sine wave or sinusoid is a mathematical curve that describes a smooth periodic
                oscillation.
              </p>
            );
          }
        },
        {
          title: 'Triangle',
          render: () => {
            return (
              <React.Fragment>
                <p>
                  A triangle wave is a non-sinusoidal waveform named for its triangular shape. It is
                  a periodic, piecewise linear, continuous real function.
                </p>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/4/4f/Triangle-td_and_fd.png'
                  alt='A bandlimited triangle wave pictured in the time domain (top) and frequency domain (bottom). The fundamental is at 220 Hz (A3).'
                />
              </React.Fragment>
            );
          }
        }
      ] }
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
    jest: ['tab'],
    notes: README
  }
};

export default {
  title: 'Molecules/Tab'
};