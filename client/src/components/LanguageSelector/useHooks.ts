import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useWindowSize} from '../../utils/hooks/useWindowSize';

import {Props} from '.';
import {SIZES} from '../../utils/constants';

export const useHooks = (props: Props) => {
  const {i18n} = useTranslation();
  const {width: screenWidth} = useWindowSize();
  const [position, setPosition] = useState<React.CSSProperties>({top: 0});

  const handleSetToEn = () => {
    props.setLanguage('en');
  };

  const handleSetToHe = () => {
    props.setLanguage('he');
  };

  useEffect(() => {
    i18n.changeLanguage(props.language);
  }, [props.language, i18n]);

  useEffect(() => {
    const collapse = screenWidth < SIZES.XLARGE;
    if (collapse && !/signup|login/.test(props.path)) {
      setPosition({bottom: 0});
    } else {
      setPosition({top: 0});
    }
  }, [screenWidth, props.path]);

  return {
    handleSetToEn,
    handleSetToHe,
    position,
  };
};
