import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

import {Assets} from '../../utils/assets';

import styles from './HelpDialog.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const HelpDialog = (props: Props) => {
  const {open, onClose} = props;
  const {t} = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('HELP_DIALOG_TITLE')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('HELP_DIALOG_BODY')}</DialogContentText>
        <DialogContentText>
          <ol>
            <li>{t('HELP_DIALOG_RULE_1')}</li>
            <li>{t('HELP_DIALOG_RULE_2')}</li>
            <li>{t('HELP_DIALOG_RULE_3')}</li>
          </ol>
        </DialogContentText>
        <div className={styles.instructions}>
          <img src={Assets.images.instructions} alt="instructions" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t('HELP_DIALOG_BACK_CTA')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
