import React from 'react';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';

import {Credentials, ErrorFields} from '../../store/types/user';
import {useHooks} from './useHooks';
import styles from './CredentialsForm.module.scss';

export interface Props {
  formType: 'login' | 'signup';
  onSubmit: (credentials: Credentials) => void;
  loading: boolean;
  error?: ErrorFields;
}

export const CredentialsForm = (props: Props) => {
  const {
    email,
    password,
    nickname,
    handleEmailChange,
    handlePasswordChange,
    handleNicknameChange,
    errorToMessage,
  } = useHooks(props);

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
      <TextField required onChange={handleEmailChange} inputProps={{type: 'email'}} label="Email" />
      <TextField
        required
        onChange={handlePasswordChange}
        inputProps={{type: 'password'}}
        label="Password"
        helperText={props.formType === 'signup' && 'Minimum 5 characters'}
      />
      {props.formType === 'signup' && (
        <TextField onChange={handleNicknameChange} label="Nickname" />
      )}

      <p className={styles.error}>{!!props.error && errorToMessage}</p>

      <Link to={props.formType === 'login' ? '/signup' : '/login'}>
        {props.formType === 'login' ? 'New user? Sign up!' : 'Already have an account? Log in!'}
      </Link>

      <Button type="submit" variant="outlined" color="primary">
        {!props.loading ? (props.formType === 'login' ? 'Login' : 'Signup') : 'Loading...'}
      </Button>
    </form>
  );
};
