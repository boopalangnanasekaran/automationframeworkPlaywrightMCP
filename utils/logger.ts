export class Logger {
  constructor(private readonly testTitle: string) {}

  step(message: string): void {
    console.log(`[STEP] ${this.testTitle} :: ${message}`);
  }

  info(message: string): void {
    console.log(`[INFO] ${this.testTitle} :: ${message}`);
  }

  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${this.testTitle} :: ${message}`);
    if (error) console.error(error);
  }
}
