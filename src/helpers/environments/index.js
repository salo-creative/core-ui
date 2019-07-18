// GET NODE ENV
export const { ENV } = webpackVars;

// CHECK IF BROWSER
export const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);