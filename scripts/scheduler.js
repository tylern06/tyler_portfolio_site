/**
 * Daily blog post scheduler — runs generate-post.ts at 7pm local time.
 * Start with: node scripts/scheduler.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const cron = require('node-cron');
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function generate() {
  console.log(`[${new Date().toLocaleString()}] Running blog post generator...`);
  try {
    execSync('node --loader ts-node/esm --no-warnings scripts/generate-post.ts', {
      cwd: ROOT,
      stdio: 'inherit',
      env: process.env,
    });
  } catch (err) {
    console.error('Generator failed:', err.message);
  }
}

// 7:00 PM local time every day
cron.schedule('0 19 * * *', generate, { timezone: 'America/Los_Angeles' });

console.log('Scheduler started — blog post will be generated daily at 7:00 PM Pacific.');
console.log('Press Ctrl+C to stop.\n');
