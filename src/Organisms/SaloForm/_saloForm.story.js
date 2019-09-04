import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { SaloForm } from '../../index';

// README //
import README from './README.md';

import useFormData from '../../Forms/useFormData/useFormData.js';

// Start of story logic
const stories = storiesOf('Organisms | SaloForm', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));


const Form = ({ name, fieldName, fieldValue }) => {
  const data = useFormData({ name });
  console.log('exposed data API', data);

  return (
    <React.Fragment>
      <button type='button' onClick={ () => data.handleBlur(fieldName, fieldValue) }>handleBlur</button>
      <button type='button' onClick={ () => data.handleChange(fieldName, fieldValue) }>handleChange</button>
      <pre>{ JSON.stringify(data, null, 2) }</pre>
    </React.Fragment>
  );
};

stories.add(
  'Data',
  (() => {
    const name = text('name', 'test');
    const fieldName = text('fieldName', 'firstName');
    const fieldValue = text('fieldValue', 'test');

    return (
      <Form
        name={ name }
        fieldName={ fieldName }
        fieldValue={ fieldValue }
      />
    );
  }), { info: { propTablesExclude: [Form] }, notes: README }
);

stories.add(
  'UI',
  (() => {
    const name = text('name', 'test');
    
    return (
      <SaloForm
        name={ name }
      />
    );
  }), { notes: README }
);