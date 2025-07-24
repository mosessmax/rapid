export type ProjectTemplate = 'api' | 'fullstack' | 'microservice';
export type Language = 'typescript' | 'javascript';
export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';
export type AuthType = 'jwt' | 'session' | 'oauth';
export type DatabaseType = 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
export type OrmType = 'prisma' | 'drizzle' | 'mongoose';
export type TestingFramework = 'jest' | 'vitest';
export type ValidationLibrary = 'zod' | 'joi';

export interface DatabaseConfig {
  type: DatabaseType;
  orm: OrmType;
}

export interface ProjectFeatures {
  auth?: AuthType;
  database?: DatabaseConfig;
  testing?: TestingFramework;
  validation?: ValidationLibrary;
  docker?: boolean;
  cors?: boolean;
  helmet?: boolean;
  compression?: boolean;
  logging?: boolean;
}

export interface ProjectConfig {
  name: string;
  template: ProjectTemplate;
  language: Language;
  packageManager: PackageManager;
  features: ProjectFeatures;
  addons: string[];
}

export interface TemplateContext {
  projectName: string;
  config: ProjectConfig;
  dependencies: string[];
  devDependencies: string[];
}

export interface PromptStep {
  name: string;
  type: 'input' | 'select' | 'multiselect' | 'confirm';
  message: string;
  choices?: Array<{ name: string; value: any; description?: string }>;
  validate?: (input: any) => boolean | string;
  when?: (answers: Partial<ProjectConfig>) => boolean;
}

export interface GenerationResult {
  success: boolean;
  path: string;
  message: string;
  nextSteps?: string[];
}