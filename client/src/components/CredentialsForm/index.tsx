import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {TextField, Button, Typography, CircularProgress, Container} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import * as _ from 'lodash';

import {Credentials, ErrorFields} from '../../store/types/app';
import {AuthenticationScreen} from '../Authentication';

import {useHooks} from './useHooks';
import styles from './CredentialsForm.module.scss';

export interface Props {
  formType: AuthenticationScreen;
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
  const {t} = useTranslation();
  const {errors, loading} = props;

  /** Render error message */
  const renderErrorMessage = useMemo(() => {
    if (errors) {
      return _.map(errors, messages =>
        _.map(messages, message => (
          <Typography color="secondary" key={message} className={styles.error}>
            {message}
          </Typography>
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
    <Container maxWidth="xs">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <TextField
            onChange={handleEmailChange}
            inputProps={{type: 'email'}}
            label={t('EMAIL_LABEL')}
            fullWidth
          />
          <TextField
            onChange={handlePasswordChange}
            inputProps={{type: 'password'}}
            label={t('PASSWORD_LABEL')}
            helperText={props.formType === 'signup' && t('PASSWORD_LENGTH_HELPER')}
            fullWidth
          />
          {props.formType === 'signup' && (
            <TextField onChange={handleNicknameChange} label={t('NICKNAME_LABEL')} fullWidth />
          )}
        </div>
        <div className={styles.errorMessages}>{renderErrorMessage}</div>
        <Button
          className={styles.submitButton}
          type="submit"
          variant="text"
          size="large"
          color="primary"
        >
          {!loading ? (
            props.formType === 'login' ? (
              t('LOGIN_LABEL')
            ) : (
              t('SIGNUP_LABEL')
            )
          ) : (
            <CircularProgress />
          )}
        </Button>
      </form>
      <div className={styles.cta}>
        <Typography variant="subtitle2">
          <Link className={styles.link} to={props.formType === 'login' ? '/signup' : '/login'}>
            {props.formType === 'login'
              ? t('NEW_USER_SIGNUP_INVITATION')
              : t('EXISTING_USER_LOGIN_INVITATION')}
          </Link>
        </Typography>
      </div>
    </Container>
  );
};
