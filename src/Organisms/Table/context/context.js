import React from 'react';

const context = React.createContext({});
const { Provider, Consumer } = context;

export { Provider, Consumer };
export default context;