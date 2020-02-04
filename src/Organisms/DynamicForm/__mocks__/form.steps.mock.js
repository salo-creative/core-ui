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
        }, {
          'label': 'Email',
          'meta': null,
          'name': 'email',
          'options': [],
          'placeholder': null,
          'type': 'email',
          'value': '',
          'validation': {
            'type': 'email', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Url',
          'meta': null,
          'name': 'url',
          'options': [],
          'placeholder': null,
          'type': 'url',
          'value': '',
          'validation': {
            'type': 'url', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Tel',
          'meta': null,
          'name': 'tel',
          'options': [],
          'placeholder': null,
          'type': 'tel',
          'value': '',
          'validation': {
            'type': 'tel', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Number',
          'meta': null,
          'name': 'number',
          'options': [],
          'placeholder': null,
          'type': 'number',
          'value': '',
          'validation': {
            'type': 'number', 'max': '10', 'min': '1', 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'File',
          'meta': null,
          'name': 'file',
          'options': [],
          'placeholder': null,
          'type': 'file',
          'value': '',
          'validation': {
            'type': 'file', 'max': null, 'min': null, 'required': false, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Select',
          'meta': null,
          'name': 'select',
          'options': [{
            'label': 'Option 1', 'value': 'option_1', '__typename': 'FormOption'
          }, {
            'label': 'Option 2', 'value': 'option_2', '__typename': 'FormOption'
          }],
          'placeholder': null,
          'type': 'select',
          'value': '',
          'validation': {
            'type': 'string', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Checkbox',
          'meta': null,
          'name': 'checkbox',
          'options': [],
          'placeholder': null,
          'type': 'checkbox',
          'value': '',
          'validation': {
            'type': 'boolean', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Radio buttons',
          'meta': null,
          'name': 'radio',
          'options': [{
            'label': 'Option 1', 'value': 'option_1', '__typename': 'FormOption'
          }, {
            'label': 'Option 2', 'value': 'option_2', '__typename': 'FormOption'
          }, {
            'label': 'Option 3', 'value': 'option_3', '__typename': 'FormOption'
          }],
          'placeholder': null,
          'type': 'radio',
          'value': '',
          'validation': {
            'type': 'string', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Address',
          'meta': '{"fields":["line2"]}',
          'name': 'address',
          'options': [],
          'placeholder': null,
          'type': 'address',
          'value': '',
          'validation': {
            'type': 'address', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }, {
          'label': 'Password',
          'meta': null,
          'name': 'password',
          'options': [],
          'placeholder': null,
          'type': 'password',
          'value': '',
          'validation': {
            'type': 'password', 'max': '200', 'min': '8', 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
          },
          '__typename': 'FormField'
        }],
        'steps': [{
          'id': '5e3947c48e0d6da904f17750',
          'title': 'Basic inputs',
          'order': 1,
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
          }, {
            'label': 'Email',
            'meta': null,
            'name': 'email',
            'options': [],
            'placeholder': null,
            'type': 'email',
            'value': '',
            'validation': {
              'type': 'email', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'Url',
            'meta': null,
            'name': 'url',
            'options': [],
            'placeholder': null,
            'type': 'url',
            'value': '',
            'validation': {
              'type': 'url', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'Tel',
            'meta': null,
            'name': 'tel',
            'options': [],
            'placeholder': null,
            'type': 'tel',
            'value': '',
            'validation': {
              'type': 'tel', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'Number',
            'meta': null,
            'name': 'number',
            'options': [],
            'placeholder': null,
            'type': 'number',
            'value': '',
            'validation': {
              'type': 'number', 'max': '10', 'min': '1', 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'File',
            'meta': null,
            'name': 'file',
            'options': [],
            'placeholder': null,
            'type': 'file',
            'value': '',
            'validation': {
              'type': 'file', 'max': null, 'min': null, 'required': false, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'Select',
            'meta': null,
            'name': 'select',
            'options': [{
              'label': 'Option 1', 'value': 'option_1', '__typename': 'FormOption'
            }, {
              'label': 'Option 2', 'value': 'option_2', '__typename': 'FormOption'
            }],
            'placeholder': null,
            'type': 'select',
            'value': '',
            'validation': {
              'type': 'string', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }],
          '__typename': 'FormStep'
        }, {
          'id': '5e3947c48e0d6da904f17751',
          'title': 'Radios, checkboxes & address',
          'order': 2,
          'fields': [{
            'label': 'Checkbox',
            'meta': null,
            'name': 'checkbox',
            'options': [],
            'placeholder': null,
            'type': 'checkbox',
            'value': '',
            'validation': {
              'type': 'boolean', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'Radio buttons',
            'meta': null,
            'name': 'radio',
            'options': [{
              'label': 'Option 1', 'value': 'option_1', '__typename': 'FormOption'
            }, {
              'label': 'Option 2', 'value': 'option_2', '__typename': 'FormOption'
            }, {
              'label': 'Option 3', 'value': 'option_3', '__typename': 'FormOption'
            }],
            'placeholder': null,
            'type': 'radio',
            'value': '',
            'validation': {
              'type': 'string', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }, {
            'label': 'Address',
            'meta': '{"fields":["line2"]}',
            'name': 'address',
            'options': [],
            'placeholder': null,
            'type': 'address',
            'value': '',
            'validation': {
              'type': 'address', 'max': null, 'min': null, 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }],
          '__typename': 'FormStep'
        }, {
          'id': '5e3947c48e0d6da904f17752',
          'title': 'Password',
          'order': 2,
          'fields': [{
            'label': 'Password',
            'meta': null,
            'name': 'password',
            'options': [],
            'placeholder': null,
            'type': 'password',
            'value': '',
            'validation': {
              'type': 'password', 'max': '200', 'min': '8', 'required': true, 'enum': [], 'regex': null, '__typename': 'FormValidation'
            },
            '__typename': 'FormField'
          }],
          '__typename': 'FormStep'
        }],
        'strings': null,
        'title': 'Test form',
        '__typename': 'Form'
      }
    }
  }
};

export default data;