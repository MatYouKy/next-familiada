import { Document } from 'mongoose';

export interface IAnswer {
  content: string;
  points: number;
  isVisible: boolean;
}

export interface IQuestion extends Document {
  content: string;
  multiplier: number;
  answerOptions: IAnswer[];
}

export interface IGame extends Document {
  totalScore: number;
  content: string;
  multiplier: number;
  answerOptions: IAnswer[];
  redTeam: ITeam;
  blueTeam: ITeam;
}

export interface ITeam {
  totalPoints: number;
  gamePoints: number;
  name: string;
  type: 'RED' | 'BLUE';
}