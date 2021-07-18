import {useTheme} from '@material-ui/core';
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
  const {
    breakpoints: {values: breakpoints},
  } = useTheme();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isXsCollapse, setIsXsCollapse] = useState(windowSize.width < SIZES.XSMALL);
  const [isSmCollapse, setIsSmCollapse] = useState(windowSize.width < SIZES.SMALL);
  const [isMdCollapse, setIsMdCollapse] = useState(windowSize.width < SIZES.MEDIUM);
  const [isLgCollapse, setIsLgCollapse] = useState(windowSize.width < breakpoints.lg);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsXsCollapse(windowSize.width < SIZES.XSMALL);
    setIsSmCollapse(windowSize.width < SIZES.SMALL);
    setIsMdCollapse(windowSize.width < SIZES.MEDIUM);
    setIsLgCollapse(windowSize.width < breakpoints.lg + 20);
  }, [windowSize.width, breakpoints]);

  return {
    ...windowSize,
    isXsCollapse,
    isSmCollapse,
    isMdCollapse,
    isLgCollapse,
  };
};
