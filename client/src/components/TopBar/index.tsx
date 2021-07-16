import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Container} from '@material-ui/core';

import {increaseDifficulty, decreaseDifficulty, resetGame} from '../../store/actions/game';
import {Difficulty} from '../../store/types/game';
import {User} from '../../store/types/app';
import {Store} from '../../store/types/store';
import {timerToString} from '../../utils/parse';
import {LanguageSelector} from '../LanguageSelector';

import {useHooks} from './useHooks';
import styles from './TopBar.module.scss';

interface StateProps {
  difficulty: Difficulty;
  moves: number;
  isInGame: boolean;
  user: User;
}

interface DispatchProps {
  increaseDifficulty: () => void;
  decreaseDifficulty: () => void;
  resetGame: () => void;
}

interface OwnProps {
  gameTimer: number;
  startGame?: () => void;
  endGame?: (nullifyTimer?: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

const TopBarComponent = (props: Props) => {
  const {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleTitleClick,
    handleLeaderboardClick,
    handleLogout,
  } = useHooks(props);
  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Container maxWidth="lg" className={styles.container}>
        <div className="left-side">
          <p className={styles.title} onClick={handleTitleClick}>
            {t('TOWER_OF_HANOI')}
          </p>
          <p className={styles.leaderboard} onClick={handleLeaderboardClick}>
            {t('LEADERBOARD')}
          </p>
        </div>
        <div className="middle">
          <p>{timerToString(props.gameTimer)}</p>
          <p>{`${t('NUMBER_OF_MOVES')} ${props.moves}`}</p>
          <div>
            <button onClick={handleDecreaseDifficulty}>-</button>
            {t(`DIFFICULTY_${Difficulty[props.difficulty]}`)}
            <button onClick={handleIncreaseDifficulty}>+</button>
          </div>
        </div>
        <div className="right-side">
          <div>
            <LanguageSelector />
            <p onClick={handleTitleClick}>{props.user.nickname}</p>
            <button onClick={handleLogout}>{t('LOGOUT_LABEL')}</button>
          </div>
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
});

const mapDispatch = {
  increaseDifficulty,
  decreaseDifficulty,
  resetGame,
};

export const TopBar = connect(mapState, mapDispatch)(TopBarComponent);
