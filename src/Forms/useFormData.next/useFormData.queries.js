import gql from 'graphql-tag';

const fieldPartial = `
  label
  meta
  name
  options {
    label
    value
  }
  placeholder
  type
  value
  validation {
    type
    max
    min
    required
    enum
    regex
  }
`;

export const GET_FORM = gql`
  query form_show($name: ID!) {
    form_show(name: $name) {
      id
      fields {
        ${ fieldPartial }
      }
      steps {
        id
        title
        order
        fields {
          ${ fieldPartial }
        }
      }
      strings {
        next
        previous
        submit
      }
      title
    }
  }
`;

export const SUBMIT_FORM = gql`
  mutation form_submit($id: ID!, $body: String!, $attachments: [UploadInput]) {
    form_submit(id: $id, body: $body, attachments: $attachments)
  }
`;