import React, {Component} from 'react';

import styles from './Login.module.scss';
import {CredentialsForm} from '../../components/CredentialsForm';

class LoginScreen extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Login</h1>
        <CredentialsForm />
      </div>
    );
  }
}

export const Login = LoginScreen;
