/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {connect} from 'react-redux';

import {Language} from '../../store/types/app';
import {setLanguage} from '../../store/actions/app';
import {Store} from '../../store/types/store';

import {useHooks} from './useHooks';
import styles from './LanguageSelector.module.scss';

interface StateProps {
  language: Language;
}

interface DispatchProps {
  setLanguage: (language: Language) => void;
}

export type Props = StateProps & DispatchProps;

const LanguageSelectorComponent = (props: Props) => {
  const {handleSetToHe, handleSetToEn} = useHooks(props);
  return (
    <div className={styles.container}>
      <img src="icons/he.png" onClick={handleSetToHe} />
      <img src="icons/en.png" onClick={handleSetToEn} />
    </div>
  );
};

const mapState = (store: Store) => ({
  language: store.appState.language,
});

const mapDispatch = {
  setLanguage,
};

export const LanguageSelector = connect(mapState, mapDispatch)(LanguageSelectorComponent);
