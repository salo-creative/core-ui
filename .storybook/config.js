import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon, { withInfo } from '@storybook/addon-info';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../src/Apollo/client';
import { addParameters } from '@storybook/react';

import {
  GlobalStyles,
  Normalise, 
  Theme,
  AlertProvider,
  AlertConsumer
} from '../src/index';
import './storybook.scss';
import 'react-dates/lib/css/_datepicker.css';

const client = ApolloClient({
  uri: 'http://localhost:4000/graphql',
  tokens: { clientKey: 'Bx2ojE2xLNcsQsHTUaNf+da35LiWBdac1oU/TovZ9auYiRdhvQfWrHhI0SfaCiKaht2JJ/dFhkyuD+o//LH+qQ==' }
});

addParameters({
  options: {
    showRoots: true
  },
});

addDecorator(withInfo({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
  styles: {
    infoBody: {
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      padding: '0 20px',
      margin: 0
    },
    infoStory: {
      padding: '40px 20px'
    }
  },
  components: {
    p({ children }) {
      return <p>{children}</p>;
    },
  }
}))

addDecorator(story => {
  return (
    <ApolloProvider client={ client }>
          <BrowserRouter>
            <Theme>
              <AlertProvider>
                <AlertConsumer
                  topOffset={ 0 }
                />
                <Normalise />
                <GlobalStyles />
                  { story() }
              </AlertProvider>
            </Theme>
          </BrowserRouter>
    </ApolloProvider>
  );
} );

setAddon(infoAddon);

configure([
  require.context('../src', true, /\.story\.js$/),
  require.context('./', true, /_story.js/)
], module);