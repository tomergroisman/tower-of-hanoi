import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useWindowSize} from '../../utils/hooks/useWindowSize';
import {SIZES} from '../../utils/constants';

import {Props} from '.';

export const useHooks = (props: Props) => {
  const {i18n} = useTranslation();
  const {width: screenWidth} = useWindowSize();
  const [position, setPosition] = useState<React.CSSProperties>({top: 0});
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  const handleSetToEn = () => {
    props.setLanguage('en');
  };

  const handleSetToHe = () => {
    props.setLanguage('he');
  };

  const handleOpenHelpDialog = () => {
    setOpenHelpDialog(true);
  };

  const handleCloseHelpDialog = () => {
    setOpenHelpDialog(false);
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
    openHelpDialog,
    handleOpenHelpDialog,
    handleCloseHelpDialog,
  };
};
