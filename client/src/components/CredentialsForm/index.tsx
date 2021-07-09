import React from 'react';
import {TextField, Button} from '@material-ui/core';

import {useHooks} from './useHooks';
import styles from './CredentialsForm.module.scss';
import {Credentials} from '../../store/types/user';

interface Props {
  formType: 'login' | 'signup';
  onSubmit: (credentials: Credentials) => void;
  loading: boolean;
  error: boolean;
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
      <TextField onChange={handlePasswordChange} inputProps={{type: 'password'}} label="Password" />
      {props.formType === 'signup' && (
        <TextField onChange={handleNicknameChange} label="Nickname" />
      )}

      <p>{props.error && 'Error in form'}</p>

      <Button type="submit" variant="outlined" color="primary">
        {!props.loading ? 'Login' : 'Loading...'}
      </Button>
    </form>
  );
};
