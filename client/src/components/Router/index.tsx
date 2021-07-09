import {Switch, Route} from 'react-router-dom';
import {Game} from '../../screens/Game';
import {Login} from '../../screens/Login';

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Game />
      </Route>
    </Switch>
  );
};
