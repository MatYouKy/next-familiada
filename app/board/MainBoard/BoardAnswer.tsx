'use client';

import classNames from 'classnames';
import React from 'react';

import useSound from 'use-sound';
import answerSound from '../../../public/static/sounds/answerSound.mp3';
import { QuestionOption } from '../../../types/game';
import classes from '../Board.module.scss';
import { IAnswer } from '@/types/game.type';

const truncateTextFunc = (text: string) => {
  if (text.length > 21) {
    return text.substring(0, 19) + '...'; // Ucina tekst po 18 znakach i dodaje '...'
  }
  return text;
};

export interface GameOptions extends QuestionOption {
  isActive: boolean;
}

interface BoardAnswerProps {
  option: IAnswer;
  index: number;
}

export const BoardAnswer = ({ option, index }: BoardAnswerProps) => {
  const { text, score, isVisible } = option;
  const [prevIsVisible, setPrevIsVisible] = React.useState(isVisible);

  const truncateText = truncateTextFunc(text);

  const [play, { stop }] = useSound(answerSound);

  React.useEffect(() => {
    if (isVisible && !prevIsVisible) {
      play();
    }
    setPrevIsVisible(isVisible);
  }, [isVisible, play, stop, prevIsVisible]);

  return (
    <li className={classes['board__answer']}>
      <h6 className={classes['board__answer-number']}>{index + 1}</h6>
      <h5
        className={classNames(classes['board__answer-text'], {
          [classes['board__answer-text--hidden']]: !isVisible,
        })}
      >
        {isVisible && truncateText}
      </h5>
      <span className={classes['board__answer-points']}>
        {isVisible ? (
          <h6>{score}</h6>
        ) : (
          <>
            <span />
            <span />
          </>
        )}
      </span>
    </li>
  );
};
