import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Component.
import { Stepper } from '../../index';
import P from '../../Typography/P';

// README
import README from './README.md';

const stories = storiesOf('Molecules | Stepper', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['stepper'] });

stories.add(
  'Basic',
  (() => {
    // Store
    const store = new Store({ step: 'step_1' });
    return (
      <State store={ store }>
        { state => (
          <Stepper
            activeItem={ state.step }
            changeStep={ (id) => store.set({ step: id }) }
          >
            { [
              {
                id: 'step_1',
                title: 'First step',
                complete: true,
                content: (
                  <React.Fragment>
                    <P> Some lovely step content</P>
                  </React.Fragment>
                )
              },
              {
                id: 'step_2',
                title: 'First step',
                complete: true,
                content: (
                  <React.Fragment>
                    <P> Some lovely step content</P>
                  </React.Fragment>
                )
              },
              {
                id: 'step_3',
                title: 'Third step',
                complete: false,
                content: (
                  <React.Fragment>
                    <P>Some more lovely step content</P>
                  </React.Fragment>
                )
              },
              {
                id: 'step_4',
                title: 'Fourth step',
                disabled: true,
                complete: false,
                content: (
                  <React.Fragment>
                    <P>Some more lovely step content</P>
                  </React.Fragment>
                )
              }
            ] }
          </Stepper>
        ) }
      </State>
    );
  }),
  {
    info: { propTables: [Stepper], propTablesExclude: [State, P, React.Fragment] },
    notes: README
  }
);