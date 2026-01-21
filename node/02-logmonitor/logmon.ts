import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import readline from 'readline';

const args = process.argv.slice(2);
const logFilePath = args[0];
const transform = args.includes('--transform') ? args[args.indexOf('--transform') + 1] : null;

if (!logFilePath) {
  console.error('Please provide a log file path.');
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(logFilePath),
  output: process.stdout,
  terminal: false,
});

function streamFile(filePath: string) {
  const watcher = chokidar.watch(filePath, { persistent: true });

  // Handle file changes and rotation
  watcher.on('change', () => {
    const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({
      input: fileStream,
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', (line: string) => {
      if (transform && line.includes(transform)) {
        console.log(line);
      } else if (!transform) {
        console.log(line);
      }
    });
  });

  watcher.on('rename', (newFilePath: string) => {
    console.log(`File renamed or rotated. Now watching: ${newFilePath}`);
    streamFile(newFilePath);
  });

  rl.on('line', (line: string) => {
    if (transform && line.includes(transform)) {
      console.log(line);
    } else if (!transform) {
      console.log(line);
    }
  });

  process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    watcher.close();
    process.exit(0);
  });
}

fs.access(logFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Log file not found: ${logFilePath}`);
    process.exit(1);
  } else {
    console.log(`Started monitoring: ${logFilePath}`);
    streamFile(logFilePath);
  }
});
