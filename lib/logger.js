const fs = require('fs');
const path = require('path');

const logFile = path.join(process.cwd(), 'data', 'activity.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  try {
    fs.appendFileSync(logFile, logEntry);
    console.log(logEntry.trim());
  } catch (error) {
    console.error('Failed to write log:', error);
  }
}

module.exports = { log };
