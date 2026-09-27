import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const logFilePath = path.join(process.cwd(), 'logs', 'app.log');

// Ensure log directory exists in development
if (!isProduction) {
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function formatLogMessage(level: LogLevel, message: string, meta?: any) {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` | Meta: ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
}

function writeToLog(level: LogLevel, message: string, meta?: any) {
  const formattedMessage = formatLogMessage(level, message, meta);

  if (isProduction) {
    // In production (Vercel), we log to stdout/stderr so the platform can collect it
    if (level === 'error') {
      console.error(formattedMessage);
    } else if (level === 'warn') {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  } else {
    // In development, write to file and console
    if (level === 'error') {
      console.error(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
    
    try {
      fs.appendFileSync(logFilePath, formattedMessage + '\n');
    } catch (err) {
      console.error('Failed to write to log file:', err);
    }
  }
}

export const logger = {
  info: (message: string, meta?: any) => writeToLog('info', message, meta),
  warn: (message: string, meta?: any) => writeToLog('warn', message, meta),
  error: (message: string, meta?: any) => writeToLog('error', message, meta),
  debug: (message: string, meta?: any) => writeToLog('debug', message, meta),
};
