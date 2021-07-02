import React from 'react';
import styles from './Disc.module.scss';

interface Props {
  index: number;
}

const discColors = ['red', 'green', 'blue', '#cc33ff', '#ff9900'];

export const Disc = (props: Props) => {
  const {index} = props;
  return (
    <div
      className={styles.disc}
      style={{backgroundColor: discColors[index], width: 30 * (index + 1)}}
    ></div>
  );
};
