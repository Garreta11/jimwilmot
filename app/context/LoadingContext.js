'use client';
import React, { createContext, useState } from 'react';

const LoadingContext = createContext({});

const LoadingProvider = ({ children }) => {
  const [homepageLoaded, setHomepageLoaded] = useState(0);

  return (
    <LoadingContext.Provider
      value={{
        homepageLoaded,
        setHomepageLoaded,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
