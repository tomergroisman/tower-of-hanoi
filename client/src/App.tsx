import {ThemeProvider} from '@material-ui/core';
import {StylesProvider, jssPreset} from '@material-ui/core/styles';
import {create} from 'jss';
import rtl from 'jss-rtl';

import {Router} from './components/Router';
import {LanguageSelector} from './components/LanguageSelector';

import {useApp} from './useApp';

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

function App() {
  const {theme} = useApp();

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <LanguageSelector />
        <Router />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
