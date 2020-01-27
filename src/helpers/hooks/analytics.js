/* eslint-disable camelcase */
import { useEffect, useRef } from 'react';
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
    skip
  } = args;

  const dispatch = useRef();

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
    if (!skip && dispatch.current !== content_id) {
      run();
      dispatch.current = content_id;
    }
  }, [content_id, run, skip]);

  return run;
}

export default useAnalytics;