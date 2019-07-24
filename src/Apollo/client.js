import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-fetch';

const createAuthLink = ({ tokens = {}, server }) => {
  return setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { jwt, clientKeyServer, clientKey } = tokens;
    
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        ...(jwt ? { 'Authorization': `Bearer ${ jwt }` } : {}),
        ...(server ? { 'X-Server-Key': clientKeyServer } : {}),
        'X-Client-Key': clientKey
      }
    };
  });
};

/**
 * Apollo Terminating link
 * The split will skip Batching if an
 * operation's context contains hasUpload: true.
 */

const OPTS = (uri) => {
  return {
    uri,
    batchInterval: 50,
    fetch
  };
};

// SETUP APOLLO CLIENT
const apollo = ({ uri, tokens, server = false }) => new ApolloClient({
  ssrMode: server,
  link: createAuthLink({ tokens, server }).concat(ApolloLink.split(
    operation => operation.getContext().hasUpload,
    createUploadLink(OPTS(uri)),
    new BatchHttpLink(OPTS(uri))
  )),
  cache: server ? new InMemoryCache() : new InMemoryCache().restore(window.__APOLLO_STATE__) // eslint-disable-line no-underscore-dangle
});

export default apollo;