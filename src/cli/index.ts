import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';

const program = new Command();

program
  .name('rapid')
  .description('Modern CLI for scaffolding production-ready Express.js applications')
  .version('0.1.0', '-v, --version', 'display version number');

program
  .command('init')
  .alias('create')
  .description('Create a new Express.js project')
  .argument('[name]', 'project name')
  .option('-t, --template <template>', 'project template (api, fullstack, microservice)')
  .option('-l, --language <language>', 'language (typescript, javascript)')
  .option('-pm, --package-manager <pm>', 'package manager (npm, yarn, pnpm, bun)')
  .option('-y, --yes', 'skip prompts and use defaults')
  .action(initCommand);

process.on('uncaughtException', (error) => {
  console.error(chalk.red('✖ Uncaught Exception:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.red('✖ Unhandled Rejection:'), reason);
  process.exit(1);
});

//  ctrl c gracefully
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n⚡ Rapid CLI interrupted. Goodbye!'));
  process.exit(0);
});

program.parse();

if (!process.argv.slice(2).length) {
  program.outputHelp();
}