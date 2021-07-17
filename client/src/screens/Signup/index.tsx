import React, {Component} from 'react';
import Authentication from '../../components/Authentication';

class SignupScreen extends Component {
  render() {
    return <Authentication screen="signup" />;
  }
}

export const Signup = SignupScreen;
