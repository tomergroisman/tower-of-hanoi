import React, {Component} from 'react';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

import {CredentialsForm} from '../../components/CredentialsForm';
import {Credentials} from '../../store/types/user';
import {apiRequests} from '../../utils/requests';
import styles from './Login.module.scss';

interface State {
  loading: boolean;
  error: boolean;
  isAuthenticated: boolean;
}

class LoginScreen extends Component<ReactCookieProps, State> {
  state: State = {
    loading: false,
    error: false,
    isAuthenticated: false,
  };

  submit = async (credentials: Credentials) => {
    this.setState({loading: true});
    try {
      const {token} = await apiRequests.getToken(credentials);
      const expires = new Date();
      expires.setMonth(new Date().getMonth() + 6);
      this.props.cookies?.set('token', token, {expires});
      this.setState({error: false, loading: false, isAuthenticated: true});
    } catch {
      this.setState({error: true, loading: false});
    }
  };

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className={styles.container}>
          <CredentialsForm
            formType="login"
            onSubmit={this.submit}
            error={this.state.error}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

export const Login = withCookies(LoginScreen);
