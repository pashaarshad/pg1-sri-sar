import { loadEnvConfig } from '@next/env';
import connectToDatabase from '../src/lib/mongodb';

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function testConnection() {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await connectToDatabase();
    console.log("MongoDB connection successful!");
    console.log(`Connected to Database: ${conn.connection.name}`);
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
