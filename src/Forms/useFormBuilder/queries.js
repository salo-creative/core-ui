import gql from 'graphql-tag';

export const GET_FORM = gql`
  query form_show($name: ID!) {
    form_show(name: $name) {
      id
      fields {
          messages {
            format
            required
          }
          label
          name
          placeholder
          required
          type
          value
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