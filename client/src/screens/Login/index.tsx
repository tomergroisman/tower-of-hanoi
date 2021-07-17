import React, {Component} from 'react';
import Authentication from '../../components/Authentication';

class LoginScreen extends Component {
  render() {
    return <Authentication screen="login" />;
  }
}

export const Login = LoginScreen;
