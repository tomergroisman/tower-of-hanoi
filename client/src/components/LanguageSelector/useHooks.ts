import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import {Props} from '.';

export const useHooks = (props: Props) => {
  const {i18n} = useTranslation();

  const handleSetToEn = () => {
    props.setLanguage('en');
  };

  const handleSetToHe = () => {
    props.setLanguage('he');
  };

  useEffect(() => {
    i18n.changeLanguage(props.language);
  }, [props.language, i18n]);

  return {
    handleSetToEn,
    handleSetToHe,
  };
};
