import {useState, useEffect} from 'react';
import {SIZES} from '../constants';

const getWindowSize = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isMobile, setIsMobile] = useState(windowSize.width < SIZES.SMALL);
  // const [isMobile, setIsMobile] = useState(windowSize.width < SIZES.MOBILE);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(windowSize.width < SIZES.SMALL);
  }, [windowSize.width]);

  return {...windowSize, isMobile};
};
