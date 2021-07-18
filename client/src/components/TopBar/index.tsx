import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Button, Container, IconButton, Typography} from '@material-ui/core';
import {Add, Remove} from '@material-ui/icons';

import {increaseDifficulty, decreaseDifficulty, resetGame} from '../../store/actions/game';
import {resetApp} from '../../store/actions/app';
import {Difficulty} from '../../store/types/game';
import {User} from '../../store/types/app';
import {Store} from '../../store/types/store';
import {timerToString} from '../../utils/parse';
import {NUM_DIFFICULTIES} from '../../utils/constants';

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
  resetApp: () => void;
}

interface OwnProps {
  gameTimer: number;
  startGame?: () => void;
  endGame?: (nullifyTimer?: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

const TopBarComponent = (props: Props) => {
  const {t} = useTranslation();
  const {
    handleDecreaseDifficulty,
    handleIncreaseDifficulty,
    handleTitleClick,
    handleLeaderboardClick,
    handleLogout,
    getContainerStyles,
    getUserSectionStyles,
  } = useHooks(props);

  const renderLevelSelector = () => {
    const {difficulty} = props;

    return (
      <div className={styles.difficultySelector}>
        <IconButton color="inherit" size="small" onClick={handleDecreaseDifficulty}>
          <Remove style={{opacity: difficulty > 0 ? 1 : 0}} />
        </IconButton>
        <Typography variant="body1">{t(`DIFFICULTY_${Difficulty[props.difficulty]}`)}</Typography>
        <IconButton color="inherit" size="small" onClick={handleIncreaseDifficulty}>
          <Add style={{opacity: difficulty < NUM_DIFFICULTIES - 1 ? 1 : 0}} />
        </IconButton>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Container maxWidth="lg" className={styles.container} style={getContainerStyles()}>
        <div className={styles.leftSide}>
          <Typography variant="h6" className={styles.link} onClick={handleTitleClick}>
            {t('TOWER_OF_HANOI')}
          </Typography>
          <Typography variant="button" className={styles.link} onClick={handleLeaderboardClick}>
            {t('LEADERBOARD')}
          </Typography>
        </div>
        <div className={styles.middle}>
          <Typography variant="body1">{timerToString(props.gameTimer)}</Typography>
          <Typography className={styles.middleText} variant="body1">{`${t('NUMBER_OF_MOVES')} ${
            props.moves
          }`}</Typography>
          {renderLevelSelector()}
        </div>
        <div className={styles.rightSide} style={getUserSectionStyles()}>
          <Typography variant="body1" onClick={handleTitleClick}>
            {props.user.nickname}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            {t('LOGOUT_LABEL')}
          </Button>
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
  resetApp,
};

export const TopBar = connect(mapState, mapDispatch)(TopBarComponent);
