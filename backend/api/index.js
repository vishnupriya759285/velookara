// Vercel Serverless Function entry point
// This re-exports the Express app for Vercel's serverless runtime
import app from '../src/server.js';

export default app;
