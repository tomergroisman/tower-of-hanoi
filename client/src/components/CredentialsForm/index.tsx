import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import * as _ from 'lodash';

import {Credentials, ErrorFields} from '../../store/types/app';
import {useHooks} from './useHooks';
import styles from './CredentialsForm.module.scss';

export interface Props {
  formType: 'login' | 'signup';
  onSubmit: (credentials: Credentials) => void;
  loading: boolean;
  errors?: ErrorFields;
}

export const CredentialsForm = (props: Props) => {
  const {
    email,
    password,
    nickname,
    handleEmailChange,
    handlePasswordChange,
    handleNicknameChange,
  } = useHooks();
  const {errors} = props;

  /** Render error message */
  const renderErrorMessage = useMemo(() => {
    if (errors) {
      return _.map(errors, messages =>
        _.map(messages, message => (
          <p key={message} className={styles.error}>
            {message}
          </p>
        ))
      );
    }
  }, [errors]);

  /** Submit form handler */
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (props.formType === 'login') {
      props.onSubmit({email, password});
    } else {
      props.onSubmit({email, password, nickname});
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField onChange={handleEmailChange} inputProps={{type: 'email'}} label="Email" />
      <TextField
        onChange={handlePasswordChange}
        inputProps={{type: 'password'}}
        label="Password"
        helperText={props.formType === 'signup' && 'Minimum 5 characters'}
      />
      {props.formType === 'signup' && (
        <TextField onChange={handleNicknameChange} label="Nickname" />
      )}

      {renderErrorMessage}

      <Link to={props.formType === 'login' ? '/signup' : '/login'}>
        {props.formType === 'login' ? 'New user? Sign up!' : 'Already have an account? Log in!'}
      </Link>

      <Button type="submit" variant="outlined" color="primary">
        {!props.loading ? (props.formType === 'login' ? 'Login' : 'Signup') : 'Loading...'}
      </Button>
    </form>
  );
};
