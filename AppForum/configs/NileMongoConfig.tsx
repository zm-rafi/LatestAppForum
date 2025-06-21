import mongoose from 'mongoose';

export async function connect() {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: "AppForum",
  });
}
