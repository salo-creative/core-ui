import React from 'react';
import 'jest-styled-components';

import { fireEvent } from '@testing-library/react';
import { renderWithApollo } from '../../../test';
import formMock from './__mocks__/form.mock';

// COMPONENT
import Form from './index';

test('Renders against snapshot', async () => {
  const { container } = renderWithApollo(
    <Form />
  );
  expect(container.firstChild).toMatchSnapshot();
});

// test('Fetches form', async () => {
//   const { findAllByText, findByLabelText } = renderWithApollo(
//     <Form name='test' />,
//     [formMock]
//   );
  
//   // Wait for form to load.
//   await findAllByText(/Basic inputs/);

//   const text = await findByLabelText(/Text field/);
//   fireEvent.change(text, {
//     target: {
//       value: 'some text'
//     }
//   });
//   expect(text.value).toBe('some text');
// });

// test.only('Submits custom form', async () => {
//   const spy = jest.fn();
//   const x = renderWithApollo(
//     <Form name='test' onSubmit={ spy } />,
//     [formMock]
//   );
  
//   // Wait for form to load.
//   await x.findByLabelText('Text field'); // form title

//   console.log(x.debug());

//   const submit = await x.getByText('Submit');
//   fireEvent.click(submit);
  
//   expect(spy).toHaveBeenCalledTimes(1);
// });