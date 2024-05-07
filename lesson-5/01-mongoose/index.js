import mongoose from 'mongoose';
const DB_URI = `mongodb+srv://student96:BPyV6x8dlERx0rrg@cluster0.x09mvxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function run() {
  try {
    await mongoose.connect(DB_URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.info('Database connection succsesfully');
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(error => console.error(error));
