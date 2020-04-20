import React from 'react';

function useWindowSize() {
  const isClient = typeof window === 'object';

  // Because the deps include window we need to
  // protect the server from reading this value.
  const sizeDeps = (() => {
    if (isClient) {
      return [isClient, window.innerWidth, window.innerHeight];
    }
    return [isClient];
  })();

  const getSize = React.useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, sizeDeps);
  
  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return windowSize;
}

export default useWindowSize;