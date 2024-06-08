'use client';

import React from 'react';

import { useWinTeam } from '../../hooks/useWinTeam';
import { GameState } from '../../types/game';
import classes from './Board.module.scss';
import { FinishBoard } from './finish-board/FinishBoard';
import { MainBoard } from './MainBoard/MainBoard';
import { BoardTeam } from './Team/BoardTeam';
import { Wellcome } from './Wellcome/Wellcome';
import useLocalStorage from '@/hooks/useLocalStorage';
import useWebSocket from '@/hooks/useWebSocket';
import { GameProgress, GameStatus, IQuestion, ITeam } from '@/types/game.type';

export type BoardProps = Omit<GameState, 'red' | 'blue'>;

export interface IGameTeam
  extends Omit<
    ITeam,
    | 'extraGame'
    | 'isActive'
    | 'faultButtonDisabled'
    | 'collectButton'
    | 'activeButton'
  > {}

export interface IGameBoard extends Omit<IQuestion, 'multiplier'> {
  score: number;
  roundNumber: number;
  gameProgress: GameProgress;
  gameStatus: GameStatus;
  introMusic: boolean;
}

interface GameInterface {
  redTeam: IGameTeam;
  blueTeam: IGameTeam;
  board: IGameBoard;
}

const Game = ({ board, redTeam, blueTeam }: GameInterface) => {
  return (
    <div className={classes['board-main']}>
      <BoardTeam teamData={redTeam} />
      <MainBoard board={board} />
      <BoardTeam teamData={blueTeam} />
    </div>
  );
};

const Board = () => {
  const [redTeam, setRedTeam] = React.useState<IGameTeam>({
    fault: [],
    name: 'czerwoni',
    teamType: 'RED',
    totalScore: 0,
  });
  const [blueTeam, setBlueTeam] = React.useState<IGameTeam>({
    fault: [],
    name: 'Niebiescy',
    teamType: 'BLUE',
    totalScore: 0,
  });

  const testBoardInitial: IGameBoard = {
    answers: [],
    id: '',
    question: '',
    score: 0,
    roundNumber: 0,
    gameProgress: 'START',
    gameStatus: 'BATTLE',
    introMusic: false
  };

  const [testBoard, setTestBoard] = React.useState<IGameBoard>(testBoardInitial);
  const { winTeam, oppositeTeam, finishTeamFunc } = useWinTeam();

  const fetchData = async () => {
    const response = await fetch('/questions.json');
    const data = await response.json();

    return setTestBoard(data.competitions[2].questions[0]);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const { storedValue } = useLocalStorage<string>('ipAddress');
  const endpoint = storedValue;
  const { message } = useWebSocket(endpoint);

  React.useEffect(() => {
    if (testBoard.gameProgress === 'END') {
      finishTeamFunc(redTeam, blueTeam);
    }
  }, [testBoard, redTeam, blueTeam, finishTeamFunc]);

  React.useEffect(() => {
    if (message) {
      console.log('message.board.introMusic', message.board.introMusic);
      setTestBoard({
        answers: message.board.currentQuestion.answers,
        id: message.board.currentQuestion.id,
        question: message.board.currentQuestion.question,
        score: parseInt(message.board.score) as number,
        roundNumber: parseInt(message.board.roundNumber) as number,
        gameProgress: message.board.gameProgress,
        gameStatus: message.board.gameStatus,
        introMusic: message.board.introMusic,
      });
      setRedTeam({
        fault: message.redTeam.fault,
        name: message.redTeam.name,
        teamType: 'RED',
        totalScore: message.redTeam.score,
      });
      setBlueTeam({
        fault: message.blueTeam.fault,
        name: message.blueTeam.name,
        teamType: 'BLUE',
        totalScore: message.blueTeam.score,
      });
    }
  }, [message]);

  return (
    <div className={classes.main}>
      {testBoard.gameProgress === 'END' && (
        <FinishBoard winTeam={winTeam} oppositeTeam={oppositeTeam} />
      )}
      {testBoard.gameProgress === 'QUIZ' && (
        <Game blueTeam={blueTeam} redTeam={redTeam} board={testBoard} />
      )}

      {(testBoard.gameProgress === 'INIT' ||
        testBoard.gameProgress === 'START') && (
        <Wellcome introMusic={testBoard.introMusic} />
      )}
    </div>
  );
};

export default Board;
