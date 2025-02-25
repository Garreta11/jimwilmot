'use client';
import React, { createContext, useState, useEffect } from 'react';
import gsap from 'gsap';

gsap.defaults({
  duration: 2,
  ease: 'expo.inOut',
});

const TransitionContext = createContext({});

const TransitionProvider = ({ children }) => {
  const [timeline, setTimeline] = useState(() => {
    return gsap.timeline({ paused: true });
  });

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
