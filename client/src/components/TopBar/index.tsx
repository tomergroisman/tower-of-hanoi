import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Container} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import {increaseDifficulty, decreaseDifficulty, resetGame} from '../../store/actions/game';
import {setLanguage} from '../../store/actions/app';
import {Difficulty} from '../../store/types/game';
import {Language, User} from '../../store/types/app';
import {Store} from '../../store/types/store';
import {timerToString} from '../../utils/parse';
import {useHooks} from './useHooks';

import styles from './TopBar.module.scss';

interface StateProps {
  difficulty: Difficulty;
  moves: number;
  isInGame: boolean;
  user: User;
  language: Language;
}

interface DispatchProps {
  increaseDifficulty: () => void;
  decreaseDifficulty: () => void;
  resetGame: () => void;
  setLanguage: (language: Language) => void;
}

interface OwnProps {
  gameTimer: number;
  startGame?: () => void;
  endGame?: (nullifyTimer?: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

const TopBarComponent = (props: Props) => {
  const history = useHistory();
  const {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleSetToEn,
    handleSetToHe,
    handleTitleClick,
  } = useHooks(props, history);
  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Container maxWidth="lg" className={styles.container}>
        <div className="left-side">
          <p className={styles.title} onClick={handleTitleClick}>
            {t('TOWER_OF_HANOI')}
          </p>
          <p onClick={handleTitleClick}>{props.user.nickname}</p>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src="icons/he.png" onClick={handleSetToHe} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src="icons/en.png" onClick={handleSetToEn} />
        </div>
        <div>
          <p>{timerToString(props.gameTimer)}</p>
          <p>{`${t('NUMBER_OF_MOVES')} ${props.moves}`}</p>
        </div>
        <div className="right-side">
          <p>
            {t('DIFFICULTY_TITLE')} {t(`DIFFICULTY_${Difficulty[props.difficulty]}`)}
          </p>
          <button onClick={handleIncreaseDifficulty}>+</button>
          <button onClick={handleDecreaseDifficulty}>-</button>
        </div>
      </Container>
    </div>
  );
};

const mapState = (store: Store) => ({
  difficulty: store.gameState.difficulty,
  moves: store.gameState.moves,
  isInGame: !!store.gameState.startTime,
  user: store.appState.user,
  language: store.appState.language,
});

const mapDispatch = {
  increaseDifficulty,
  decreaseDifficulty,
  resetGame,
  setLanguage,
};

export const TopBar = connect(mapState, mapDispatch)(TopBarComponent);
