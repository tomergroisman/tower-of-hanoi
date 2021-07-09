import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

import {Router} from './components/Router';
import {setUser} from './store/actions/app';
import {apiRequests} from './utils/requests';

function App() {
  const [cookies] = useCookies(['token']);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.token) {
        const user = await apiRequests.getUser(cookies.token);
        dispatch(setUser(user));
      }
    };

    fetchUser();
  }, [cookies, dispatch]);

  return (
    <>
      <Router />
      {!cookies.token && <Redirect to="/signup" />}
    </>
  );
}

export default App;
