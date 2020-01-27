/* eslint-disable camelcase */
import { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_ANALYTICS_EVENT = gql`
  mutation analytics_add($body: AnalyticsEventInput!) {
    analytics_add(body: $body)
  }
`;

function useAnalytics(args) {
  const {
    event_type,
    content_id,
    content_type,
    url,
    metadata,
    defer
  } = args;

  const [run] = useMutation(ADD_ANALYTICS_EVENT, {
    variables: {
      body: {
        event_type,
        content_id,
        content_type,
        url,
        metadata: typeof metadata === 'string' ? metadata : JSON.stringify(metadata)
      }
    }
  });

  useEffect(() => {
    if (!defer) {
      run();
    }
    // Only want to run this on 'mount' so ignore deps used
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return run;
}

export default useAnalytics;