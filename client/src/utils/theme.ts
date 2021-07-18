import {createTheme, responsiveFontSizes, ThemeOptions} from '@material-ui/core';
import {heIL, enUS} from '@material-ui/core/locale';

import {Language} from '../store/types/app';

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: '#0099ff',
    },
    secondary: {
      main: '#ff3300',
    },
  },
  typography: {
    fontFamily: 'Rubik',
  },
};

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

export const getTheme = (language: Language) =>
  responsiveFontSizes(language === 'en' ? ltrTheme : rtlTheme);
