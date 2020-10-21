import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { MockedProvider } from '@apollo/client/testing';

// HELPERS
import Theme from '../src/Global/Theme';

export const fluidTypeVals = ({ minLH, maxLH, maxFS, minFS }) => ({
  minFont: `calc(${ minFS }px + (${ maxFS } - ${ minFS }) * (100vw - 400px) / (1200 - 400))`,
  minLineHeight: `calc(${ minLH }px + (${ maxLH } - ${ minLH }) * (100vw - 400px) / (1200 - 400))`
});

export const renderWithTheme = (node) => {
  return (
    render(
      <Theme>
        <Router history={ createHistory() }>
          { node }
        </Router>
      </Theme>
    )
  );
};

export const renderWithApollo = (node, mocks) => {
  return (
    render(
      <Theme>
        <Router history={ createHistory() }>
          <MockedProvider mocks={ mocks } addTypename={ false }>
            { node }
          </MockedProvider>
        </Router>
      </Theme>
    )
  );
};