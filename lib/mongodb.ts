import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error(
    'Please define the MONGO_URL environment variable in your .env.local file'
  );
}

interface MongoCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

const cache: MongoCache = {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<mongoose.Mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URL);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export default dbConnect;
