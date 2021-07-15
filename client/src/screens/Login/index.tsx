import React, {Component} from 'react';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

import {CredentialsForm} from '../../components/CredentialsForm';
import {Credentials, ErrorFields} from '../../store/types/app';
import {apiRequests} from '../../utils/api/requests';

import styles from './Login.module.scss';

interface State {
  loading: boolean;
  isAuthenticated: boolean;
  errors?: ErrorFields;
}

class LoginScreen extends Component<ReactCookieProps, State> {
  state: State = {
    loading: false,
    isAuthenticated: false,
  };

  submit = async (credentials: Credentials) => {
    this.setState({loading: true});
    try {
      const {token} = await apiRequests.getToken(credentials);
      const expires = new Date();
      expires.setMonth(new Date().getMonth() + 6);
      this.props.cookies?.set('token', token, {expires});
      this.setState({errors: undefined, loading: false, isAuthenticated: true});
    } catch (e) {
      const errors: ErrorFields = e.response.data;
      this.setState({errors: errors, loading: false});
    }
  };

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className={styles.container}>
          <CredentialsForm
            formType="login"
            onSubmit={this.submit}
            errors={this.state.errors}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

export const Login = withCookies(LoginScreen);
