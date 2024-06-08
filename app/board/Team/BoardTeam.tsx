import React from 'react';

import useSound from 'use-sound';

import utrataSound from '../../../public/static/sounds/utrataSound.mp3';

import { Losses } from '../../../components/Losses/Losses';
import { useElementHeight } from '../../../hooks/useElementSize';
import classes from '../Board.module.scss';
import { IGameTeam } from '../page';

interface BoardTeamProps {
  teamData: IGameTeam;
}

export const BoardTeam = React.memo(({ teamData }: BoardTeamProps) => {
  const [faultPlay, { stop: faultStop }] = useSound(utrataSound);
  const [divRef, divHeight] = useElementHeight<HTMLUListElement>();

  if (!teamData) {
    console.error('teamData is not provided or is invalid', teamData);
    return <div>Error</div>;
  }

  const elementHeight =
    teamData.fault[0] && teamData.fault[0].fault === 'BATTLE'
      ? divHeight / 3
      : divHeight / 5;

  React.useEffect(() => {
    if (teamData.fault && teamData.fault.length > 0) {
      faultPlay();
    } else {
      faultStop();
    }
  }, [teamData.fault, faultPlay, faultStop]);

  return (
    <div className={classes.team}>
      <h6 className={classes['team__name']}>{teamData.name}</h6>
      <div
        className={classes['team__losses-wrapper']}
        style={{
          lineHeight: divHeight / 250,
        }}
      >
        <Losses
          className={classes.losses}
          fault={teamData.fault}
          extraChange={
            teamData.fault[0] && teamData.fault[0].fault === 'BATTLE'
          }
          missedSize={elementHeight}
          column
          ref={divRef}
        />
      </div>
      <div className={classes['team__points']}>{teamData.totalScore}</div>
    </div>
  );
});

BoardTeam.displayName = 'BoardTeam';
