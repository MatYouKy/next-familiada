import React from 'react';

import useSound from 'use-sound';

import introSound from '../../../public/static/sounds/introSound.mp3';

import { useWidthElement } from '../../../hooks/useElementSize';
import classes from '../Board.module.scss';

export const Wellcome = ({ introMusic }: { introMusic: boolean }) => {
  const [refDiv, widthDiv] = useWidthElement<HTMLDivElement>();
  const sizeFont = `${widthDiv / 6}px`;
  const spaceLetter = `${widthDiv / 500}px`;

  const [introPlay, { stop: introStop }] = useSound(introSound);
  console.log('intro-music', introMusic);

  React.useEffect(() => {
    if (introMusic) {
      introPlay();
    } else {
      introStop();
    }
  }, [introMusic, introPlay, introStop]);

  return (
    <div className={classes.wellcome} ref={refDiv}>
      <h1
        className={classes['wellcome__text']}
        style={{ fontSize: sizeFont, letterSpacing: spaceLetter }}
      >
        Familiada
      </h1>
    </div>
  );
};
