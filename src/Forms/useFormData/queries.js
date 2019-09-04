import gql from 'graphql-tag';

const fieldPartial = `
  label
  messages {
    format
    required
  }
  meta
  name
  options {
      label
      name
      value
  }
  placeholder
  required
  type
  value
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
      title
      validation
    }
  }
`;

export const SUBMIT_FORM = gql`
  mutation form_submit($id: ID!, $body: String!, $attachments: [Upload]) {
    form_submit(id: $id, body: $body, attachments: $attachments)
  }
`;