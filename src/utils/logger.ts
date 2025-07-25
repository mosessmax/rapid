import chalk from 'chalk';
import ora, { Ora } from 'ora';


export class Logger {
  private static spinner: Ora | null = null;

  static info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  }

  static success(message: string): void {
    console.log(chalk.green('✓'), message);
  }

  static warn(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  }

  static error(message: string): void {
    console.log(chalk.red('✖'), message);
  }

  static debug(message: string): void {
    if (process.env.DEBUG) {
      console.log(chalk.gray('🐛'), chalk.gray(message));
    }
  }
  static startSpinner(message: string): void {
    this.spinner = ora(message).start();
  }

  static updateSpinner(message: string): void {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  static succeedSpinner(message?: string): void {
    if (this.spinner) {
      this.spinner.succeed(message);
      this.spinner = null;
    }
  }

  static failSpinner(message?: string): void {
    if (this.spinner) {
      this.spinner.fail(message);
      this.spinner = null;
    }
  }

  static stopSpinner(): void {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  static newLine(): void {
    console.log();
  }

  static title(message: string): void {
    console.log();
    console.log(chalk.bold.cyan(`🚀 ${message}`));
    console.log(chalk.gray('─'.repeat(message.length + 3)));
  }

  static header(): void {
    console.log(chalk.bold.cyan(`
  ██████╗  █████╗ ██████╗ ██╗██████╗ 
  ██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗
  ██████╔╝███████║██████╔╝██║██║  ██║
  ██╔══██╗██╔══██║██╔═══╝ ██║██║  ██║
  ██║  ██║██║  ██║██║     ██║██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ 
    `));
    console.log(chalk.gray('  Modern Express.js scaffolding'));
    console.log();
  }

  static box(message: string, title?: string): void {
    const lines = message.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    const width = Math.max(maxLength + 4, (title?.length || 0) + 4);
    
    console.log();
    console.log(chalk.gray('┌' + '─'.repeat(width - 2) + '┐'));
    
    if (title) {
      const padding = ' '.repeat(Math.floor((width - title.length - 2) / 2));
      console.log(chalk.gray('│') + chalk.bold.white(padding + title + padding) + chalk.gray('│'));
      console.log(chalk.gray('├' + '─'.repeat(width - 2) + '┤'));
    }
    
    lines.forEach(line => {
      const padding = ' '.repeat(width - line.length - 2);
      console.log(chalk.gray('│') + ' ' + line + padding + chalk.gray('│'));
    });
    
    console.log(chalk.gray('└' + '─'.repeat(width - 2) + '┘'));
    console.log();
  }
}
