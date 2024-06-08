import mongoose, { Schema } from 'mongoose';
import { IAnswer, IGame, ITeam } from './types';

const teamSchema = new Schema<ITeam>({
  totalPoints: { type: Number, required: true, default: 0 },
  gamePoints: { type: Number, required: true, default: 0 },
  name: { type: String, required: true, default: 'Czerwoni' },
  type: { type: 'String', required: true, default: 'RED' },
});

const gameAnswerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  points: { type: Number, required: true },
  isVisible: { type: Boolean, default: false },
});

const gameQuestionSchema = new Schema<IGame>({
  content: { type: String, required: true },
  multiplier: { type: Number, required: true, default: 1 },
  totalScore: { type: Number, required: true, default: 0 },
  answerOptions: [gameAnswerSchema],
  redTeam: teamSchema,
  blueTeam: teamSchema,
});

const Game = mongoose.model<IGame>('Game', gameQuestionSchema);

export default Game;
