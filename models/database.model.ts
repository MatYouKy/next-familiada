import mongoose, { Schema, Document } from 'mongoose';
import { IAnswer } from './types';

interface IQuestion extends Document {
  content: string;
  multiplier: number;
  answerOptions: IAnswer[];
}

const questionSchema = new Schema<IQuestion>({
  content: { type: String, required: true },
  multiplier: { type: Number, required: true },
  answerOptions: [{ content: String, isVisible: Boolean, points: Number }],
});

const Question =
  mongoose.models.Question ||
  mongoose.model<IQuestion>('Question', questionSchema);

export default Question;
