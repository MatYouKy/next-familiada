'use client';

import React from 'react';


import useSound from 'use-sound';

import przerywnikSound from '../../../public/static/sounds/przerywnikSound.mp3';

import classes from '../Board.module.scss';

import { BoardAnswer } from './BoardAnswer';
import { IGameBoard } from '../page';

interface MainBoardProps {
  board: IGameBoard;
}

export const MainBoard = ({ board }: MainBoardProps) => {
  const [suma, setSuma] = React.useState(0);
  const { answers, question, score, roundNumber, gameStatus } = board;
  const [steperPlay, { stop: steperStop }] = useSound(przerywnikSound);

  const answerList = answers.map((option, index) => {
    return <BoardAnswer key={option.id} option={option} index={index} />;
  });

  React.useEffect(() => {
    const visibleAnswersSum = answers.reduce((total, answer) => {
      return answer.isVisible ? total + answer.score : total;
    }, 0);
    setSuma(visibleAnswersSum);
  }, [answers]);

  React.useEffect(() => {
    if (roundNumber > 1) {
      steperPlay();
    } else {
      steperStop();
    }
  }, [roundNumber, steperPlay, steperStop]);

  return (
    <div className={classes.board}>
      <div className={classes['board__points']}>{score}</div>
      <ul className={classes['board__answers']}>{answerList}</ul>
      <div className={classes['board__sum']}>
        <span className={classes['board__sum-points']}>
          <h6 className={classes['board__sum-points-text']}>SUMA</h6>
          <h6 className={classes['board__sum-points-score']}>{suma}</h6>
        </span>
      </div>
      {gameStatus !== 'BATTLE' && <h3 className={classes['board__question']}>{question}</h3>}
    </div>
  );
};
