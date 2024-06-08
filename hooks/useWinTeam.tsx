import { useState } from 'react';

import { FinishBoardInterface} from '../types/game';
import { IGameTeam } from '@/app/board/page';

export const useWinTeam = () => {
  const [winTeam, setWinTeam] = useState<FinishBoardInterface['winTeam']>({
    teamName: 'red',
    score: 0,
  });
  const [oppositeTeam, setOppositeTeam] = useState<
    FinishBoardInterface['oppositeTeam']
  >({
    teamName: 'blue',
    score: 0,
  });

  const finishTeamFunc = (red: IGameTeam, blue: IGameTeam) => {
    if (red.totalScore > blue.totalScore) {
      setWinTeam({ teamName: red.name, score: red.totalScore });
      setOppositeTeam({ teamName: blue.name, score: blue.totalScore });
    } else {
      setWinTeam({ teamName: blue.name, score: blue.totalScore });
      setOppositeTeam({ teamName: red.name, score: red.totalScore });
    }
  };

  return { winTeam, oppositeTeam, finishTeamFunc };
};
