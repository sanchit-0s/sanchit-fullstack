
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const processId = process.pid;
const nodeVersion = process.version;
const workingDir = process.cwd();

const configVar = process.env.CONFIG_VAR || 'default value';

const args = process.argv.slice(2);

function printInfo() {
  console.log(`Process ID: ${processId}`);
  console.log(`Node Version: ${nodeVersion}`);
  console.log(`Working Directory: ${workingDir}`);
  console.log(`Config Value: ${configVar}`);
}

function handleDebugFlag() {
  if (args.includes('--debug')) {
    console.log('Running with --inspect...');
  }
}

function handleSIGINT() {
  process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    process.exit(0);
  });
}

function main() {
  handleDebugFlag();
  printInfo();
  handleSIGINT();

  if (args.length > 0) {
    console.log('Arguments:', args.join(' '));
  }
}

main();
