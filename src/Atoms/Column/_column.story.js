import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import {
  withKnobs, text, select, number
} from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Column } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const alignItems = select(
    'Align items',
    {
      'Flex start': 'flex-start',
      'Flex end': 'flex-end',
      Center: 'center'
    },
    'flex-start'
  );
  const justifyContent = select(
    'Justify contnet',
    {
      'Space between': 'space-between',
      Center: 'center',
      'Flex start': 'flex-start',
      'Flex end': 'flex-end'
    },
    'flex-start'
  );
  const padding = text('Padding', '10px');
  const columns = number('Columns', 12);
  const defaultWidth = number('Default width', 12);
  const xLarge = number('X Large width (1200px)', 12);
  const large = number('Large width (1000px)', 12);
  const medium = number('Medium Width (860px)', 12);
  const tablet = number('Tablet width (767px)', 12);
  const small = number('Small width (620px)', 12);
  const phone = number('Phone Width (480px)', 12);
  return (
    <Column
      alignItems={ alignItems }
      justifyContent={ justifyContent }
      default={ defaultWidth }
      xLarge={ xLarge }
      large={ large }
      medium={ medium }
      tablet={ tablet }
      small={ small }
      phone={ phone }
      columns={ columns }
      padding={ padding }
      style={ {
        background: '#eaeaea'
      } }
    >
      A lovely Column
    </Column>
  );
};

Basic.story = {
  decorators: [withKnobs, withTests({
    results
  })],
  parameters: {
    notes: README,
    jest: ['column']
  }
};

export default {
  title: 'Atoms/Grid/Column'
};