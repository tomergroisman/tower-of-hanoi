import React, {Component} from 'react';
import {ReactCookieProps, withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

import {CredentialsForm} from '../../components/CredentialsForm';
import {Credentials, ErrorFields} from '../../store/types/app';
import {apiRequests} from '../../utils/requests';
import styles from './Signup.module.scss';

interface State {
  loading: boolean;
  errors?: ErrorFields;
  isAuthenticated: boolean;
}

class SignupScreen extends Component<ReactCookieProps, State> {
  state: State = {
    loading: false,
    isAuthenticated: false,
  };

  submit = async (userData: Credentials) => {
    this.setState({loading: true});
    try {
      await apiRequests.createUser(userData);
      const {token} = await apiRequests.getToken(userData);
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
            formType="signup"
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

export const Signup = withCookies(SignupScreen);
