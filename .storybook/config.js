import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon, { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// COMPONENTS
import {
  AuthProvider, 
  GlobalStyles,
  Normalise, 
  Theme,
  AlertProvider,
  AlertConsumer,
  getTokensClient 
} from '../src/index';
import './storybook.scss';
import 'react-dates/lib/css/_datepicker.css';

addDecorator(
  withOptions({
    brandTitle: 'Core UI',
    hierarchyRootSeparator: /\|/,
    brandUrl: 'https://github.com/SaloCreative/core-ui',
    showPanel: true,
    panelPosition: 'right'
  })
)

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
  const tokens = getTokensClient(cookies);
  return (
    <AuthProvider tokens={ tokens }>
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
    </AuthProvider>
  );
} );


function loadStories() {
  require('./_story');
  require('../src/Atoms/_atoms.story');
  require('../src/Typography/_typography.story');
  require('../src/Molecules/_molecules.story');
  require('../src/Forms/_forms.story');
  require('../src/Organisms/_organisms.story');
  require('../src/Auth/_auth.story');
  require('../src/helpers/_helpers.story');
}

setAddon(infoAddon);

configure(loadStories, module);