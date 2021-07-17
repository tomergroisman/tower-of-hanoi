import React from 'react';

import {CredentialsForm} from '../CredentialsForm';

import {useHooks} from './useHooks';
import styles from './Authentication.module.scss';

export type AuthenticationScreen = 'login' | 'signup';

export interface Props {
  screen: AuthenticationScreen;
}

export default function Authentication(props: Props) {
  const {errors, loading, handleSubmit} = useHooks(props);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <img src="img/Logo.png" className={styles.logo} alt="Logo" />
        <CredentialsForm
          formType={props.screen}
          onSubmit={handleSubmit}
          errors={errors}
          loading={loading}
        />
      </div>
    </div>
  );
}
