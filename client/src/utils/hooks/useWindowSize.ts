import {useState, useEffect} from 'react';
import {MOBILE_THRESHOLD} from '../constants';

const getWindowSize = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isMobile, setIsMobile] = useState(windowSize.width < MOBILE_THRESHOLD);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(windowSize.width < MOBILE_THRESHOLD);
  }, [windowSize.width]);

  return {...windowSize, isMobile};
};
