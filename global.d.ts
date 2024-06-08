/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Mongoose> | null;
      };
    }
  }
}


declare module 'http' {
  interface IncomingMessage {
    socket: Socket & { server?: any };
  }
}

declare module '*.mp3' {
  const src: string;
  export default src;
}