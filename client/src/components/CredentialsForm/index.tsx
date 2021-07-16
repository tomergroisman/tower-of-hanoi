import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {TextField, Button, Typography, CircularProgress} from '@material-ui/core';
import * as _ from 'lodash';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
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
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <TextField
            onChange={handleEmailChange}
            inputProps={{type: 'email'}}
            label={t('EMAIL_LABEL')}
          />
          <TextField
            onChange={handlePasswordChange}
            inputProps={{type: 'password'}}
            label={t('PASSWORD_LABEL')}
            helperText={props.formType === 'signup' && t('PASSWORD_LENGTH_HELPER')}
          />
          {props.formType === 'signup' && (
            <TextField onChange={handleNicknameChange} label={t('NICKNAME_LABEL')} />
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
          {!props.loading ? (
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
    </div>
  );
};
