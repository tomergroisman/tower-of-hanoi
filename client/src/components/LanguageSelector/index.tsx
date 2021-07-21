/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {connect} from 'react-redux';
import HelpIcon from '@material-ui/icons/Help';

import {Language} from '../../store/types/app';
import {setLanguage} from '../../store/actions/app';
import {Store} from '../../store/types/store';
import {Assets} from '../../utils/assets';
import {Icon} from '../Icon';
import {HelpDialog} from '../HelpDialog';

import {useHooks} from './useHooks';
import styles from './LanguageSelector.module.scss';

interface StateProps {
  language: Language;
  path: string;
}

interface DispatchProps {
  setLanguage: (language: Language) => void;
}

export type Props = StateProps & DispatchProps;

const LanguageSelectorComponent = (props: Props) => {
  const {
    handleSetToHe,
    handleSetToEn,
    position,
    openHelpDialog,
    handleOpenHelpDialog,
    handleCloseHelpDialog,
  } = useHooks(props);

  return (
    <div className={styles.container} style={position}>
      <Icon spacing={1} asset={Assets.icons.en} onClick={handleSetToEn} />
      <Icon spacing={1} asset={Assets.icons.he} onClick={handleSetToHe} />
      <HelpIcon className={styles.help} onClick={handleOpenHelpDialog} />

      <HelpDialog open={openHelpDialog} onClose={handleCloseHelpDialog} />
    </div>
  );
};

const mapState = (store: Store) => ({
  language: store.appState.language,
  path: store.appState.path,
});

const mapDispatch = {
  setLanguage,
};

export const LanguageSelector = connect(mapState, mapDispatch)(LanguageSelectorComponent);
