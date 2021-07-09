import React from 'react';
import {TextField} from '@material-ui/core';

import styles from './CredentialsForm.module.scss';

export const CredentialsForm = () => {
  return (
    <form className={styles.form}>
      <TextField inputProps={{type: 'email'}} label="Email" />
      <TextField inputProps={{type: 'password'}} label="Password" />
    </form>
  );
};
