export type MultiplierType = 1 | 2 | 3;
export type RoundStatus = number;
export type TeamType = 'RED' | 'BLUE';
export type GameStatus =
  | 'BATTLE'
  | 'GAME'
  | 'SUMMARY-GAME'
  | 'BOARD-BLOCKED'
  | 'EXTRA-GAME'
  | 'NEXT-ROUND'
  | 'END-GAME';
export type GameProgress = 'INIT' | 'START' | 'QUIZ' | 'END';

export interface IFault {
  fault: 'BATTLE' | 'GAME';
}

export interface IGameTeams {
  redTeam: ITeam;
  blueTeam: ITeam;
}

export interface IConnect {
  status: 'error' | 'success';
  message: string;
}

export interface IQuiz {
  questions: IQuestion[];
}

export interface IAnswer {
  id: string;
  text: string;
  score: number;
  isVisible?: boolean;
}

export interface IQuestion {
  id: string;
  question: string;
  multiplier: MultiplierType;
  answers: IAnswer[];
}

export interface ITeam {
  teamType: TeamType;
  totalScore: number;
  fault: IFault[];
  name: string;
  extraGame: boolean;
  isActive: boolean;
  faultButtonDisabled: boolean;
  collectButton: boolean;
  activeButton: boolean;
}

export interface IGame {
  id: string;
  score: number;
  roundNumber: RoundStatus;
  currentQuestion: IQuestion;
  gameTeams: IGameTeams;
  gameStatus: GameStatus;
  connected: IConnect;
  ipAddress: string;
  sessionActive: boolean;
}

export interface ICompetition {
  competitionTitle: string;
  id: string;
  questions: IQuestion[];
  eventDate: string;
}

export interface ICompetitions {
  competitions: ICompetition[];
}
export type IGlobal = Omit<
  IGame,
  | 'currentQuestion'
  | 'score'
  | 'teams'
  | 'id'
  | 'roundNumber'
  | 'gameTeams'
  | 'gameStatus'
> & { questions: IQuestion[]; gameProgress: GameProgress };
export type IBoard = Omit<
  IGame,
  'teams' | 'id' | 'connected' | 'ipAddress' | 'sessionActive' | 'gameTeams'
> & {
  showNextBattleButton: boolean;
  showNextRoundButton: boolean;
  showEndGameButton: boolean;
};
