import {createTheme} from '@material-ui/core';
import {heIL, enUS} from '@material-ui/core/locale';

import {Language} from '../store/types/app';

const theme = {};

const rtlTheme = createTheme(
  {
    ...theme,
    direction: 'rtl',
  },
  heIL
);

const ltrTheme = createTheme(
  {
    ...theme,
    direction: 'ltr',
  },
  enUS
);

export const getTheme = (language: Language) => (language === 'en' ? ltrTheme : rtlTheme);
