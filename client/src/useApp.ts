import {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {setPath, setUser} from './store/actions/app';
import {AppState} from './store/types/app';
import {Store} from './store/types/store';
import {fetchUser} from './utils/api/fetch';

export const useApp = () => {
  const [cookies, setCookies] = useCookies(['token']);
  const history = useHistory();
  const dispatch = useDispatch();
  const appState = useSelector<Store, AppState>(store => store.appState);

  useEffect(() => {
    const fetch = async () => {
      const user = await fetchUser(cookies.token);
      dispatch(setUser(user));
    };

    cookies.token && fetch();
  }, [cookies, dispatch]);

  useEffect(() => {
    const setNewPath = () => {
      dispatch(setPath(window.location.pathname));
    };

    history.listen(setNewPath);
    return () => {
      history.listen(setNewPath);
    };
  }, [history, dispatch]);

  useEffect(() => {
    document.body.setAttribute('dir', appState.language === 'en' ? 'ltr' : 'rtl');
    window.localStorage.setItem('language', appState.language);
  }, [appState.language, setCookies]);

  return {
    theme: appState.theme,
  };
};
