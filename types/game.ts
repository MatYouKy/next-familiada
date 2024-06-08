export type MultiplierValue = 1 | 2 | 3;

export interface QuestionOption {
  id: string;
  text: string;
  points: number;
}

export interface Question {
  id: string;
  questionText: string;
  multiplier: MultiplierValue;
  options: QuestionOption[];
}

export type TeamType = 'red' | 'blue';

export type RoundType = 1 | 2 | 3 | 4 | 5 | 6;

export interface GameOptions extends QuestionOption {
  isActive: boolean;
}

export interface TeamData {
  teamName: string;
  team: TeamType;
  teamScore: number;
  loss: number;
  extraChange: boolean;
  isWin: boolean;
  turn: boolean;
}

export type BattleTeam = Omit<
  TeamData,
  'teamScore' | 'extraChange' | 'isWin' | 'isWait' | 'team' | 'loss'
>;

export interface BattleInterfce {
  isBattle: boolean;
  red: BattleTeam;
  blue: BattleTeam;
}

export interface GameState {
  startGame: boolean;
  endOfRound: boolean;
  multiplier: MultiplierValue;
  round: RoundType;
  roundScore: number;
  isBattle: boolean;
  red: TeamData;
  blue: TeamData;
  questionText: Question['questionText'];
  options: GameOptions[];
  introMusic: boolean;
  endGame: boolean;
}

interface TeamScore {
  teamName: TeamData['teamName'];
  score: number;
}

export interface FinishBoardInterface {
  winTeam: TeamScore;
  oppositeTeam: TeamScore;
}
