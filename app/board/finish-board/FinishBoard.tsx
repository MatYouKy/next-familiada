import React from 'react';

import { useWidthElement } from '../../../hooks/useElementSize';
import { FinishBoardInterface } from '../../../types/game';

import classes from './finish-board.module.scss';

export const FinishBoard = ({
  winTeam,
  oppositeTeam,
}: FinishBoardInterface) => {
  const [refDiv, widthDiv] = useWidthElement<HTMLDivElement>();
  const sizeFont = `${widthDiv / 20}px`;
  const spaceLetter = `${widthDiv / 500}px`;

  return (
    <div className={classes['finish-board']} ref={refDiv}>
      <div
        className={classes['finish-board__win']}
        style={{ fontSize: sizeFont, letterSpacing: spaceLetter }}
      >
        <h5>Wygrywa Drużyna</h5>
        <h1>{winTeam.teamName}</h1>
        <h5>z Wynikiem</h5>
        <h1>{winTeam.score}</h1>
        <h5>punktów</h5>
      </div>
      <div className={classes['finish-board__lose']}>
        <h2>{oppositeTeam.teamName}</h2>
        <p>{oppositeTeam.score}</p>
      </div>
    </div>
  );
};
