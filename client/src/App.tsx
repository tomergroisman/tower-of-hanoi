import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core';

import {Router} from './components/Router';
import {setUser} from './store/actions/app';
import {apiRequests} from './utils/api/requests';
import {theme} from './utils/theme';
import {Language} from './store/types/app';
import {Store} from './store/types/store';

function App() {
  const [cookies] = useCookies(['token']);
  const dispatch = useDispatch();
  const language = useSelector<Store, Language>(store => store.appState.language);

  /** Fetch user info from token in cookies */
  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.token) {
        const user = await apiRequests.getUser(cookies.token);
        dispatch(setUser(user));
      }
    };

    fetchUser();
  }, [cookies, dispatch]);

  /** Set HTML direction on language change */
  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute('dir', language === 'en' ? 'ltr' : 'rtl');
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      <Router />
      {!cookies.token && <Redirect to="/signup" />}
    </ThemeProvider>
  );
}

export default App;
