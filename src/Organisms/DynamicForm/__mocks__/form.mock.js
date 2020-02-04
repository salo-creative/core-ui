import { GET_FORM } from '../../../Forms/useFormData.next/useFormData.queries';

const data = {
  request: {
    query: GET_FORM,
    variables: {
      name: 'test'
    }
  },
  result: {
    'data': {
      'form_show': {
        'id': '5d66a772b1d08a4e1371fe2e',
        'fields': [{
          'label': 'Text field',
          'meta': null,
          'name': 'text',
          'options': [],
          'placeholder': 'Text',
          'type': 'text',
          'value': '',
          'validation': {
            'type': 'string', 'max': '255', 'min': '3', 'required': true, 'enum': ['Rich', 'Tim'], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }],
        'strings': null,
        'title': 'Test form',
        '__typename': 'Form'
      }
    }
  }
};

export default data;