import React from 'react';
import styles from './Peg.module.scss';

interface Props {
  backgroundColor: string;
}

export const Peg = (props: Props) => {
  const {backgroundColor} = props;
  return <div className={styles.container} style={{backgroundColor}}></div>;
};
