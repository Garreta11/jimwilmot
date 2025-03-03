'use client';
import React, { createContext, useState } from 'react';

const TimeContext = createContext({});

const TimeProvider = ({ children }) => {
  const [videoTime, setVideoTime] = useState(0);

  return (
    <TimeContext.Provider
      value={{
        videoTime,
        setVideoTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export { TimeContext, TimeProvider };
