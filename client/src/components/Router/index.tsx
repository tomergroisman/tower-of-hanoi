import {useCookies} from 'react-cookie';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Game} from '../../screens/Game';
import {Leaderboard} from '../../screens/Leaderboard';
import {Login} from '../../screens/Login';
import {Signup} from '../../screens/Signup';

export const Router = () => {
  const [cookies] = useCookies(['token']);

  return (
    <Switch>
      <Route exact path="/login">
        {!cookies.token ? <Login /> : <Redirect push to="/" />}
      </Route>
      <Route exact path="/signup">
        {!cookies.token ? <Signup /> : <Redirect push to="/" />}
      </Route>
      <Route exact path="/leaderboard">
        {cookies.token ? <Leaderboard /> : <Redirect push to="/signup" />}
      </Route>
      <Route exact path="/">
        {cookies.token ? <Game /> : <Redirect push to="/signup" />}
      </Route>
    </Switch>
  );
};
