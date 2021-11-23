/** @format */

export class StringParser {
  private cursor: number = 0;

  constructor(private readonly text: string) {
    this.reset();
  }

  get atEnd(): boolean {
    return this.cursor === this.text.length;
  }

  get peek(): string {
    return this.text.charAt(this.cursor);
  }

  reset(): void {
    this.cursor = 0;
  }

  next(): string {
    const char = this.peek;
    this.forward(1);
    return char;
  }

  until(stopCharacters: string): string[] {
    const result = [];
    while (!this.atEnd && !(stopCharacters.indexOf(this.peek) > -1)) {
      result.push(this.next());
    }
    this.forward(1);
    return result;
  }

  forward(n: number): void {
    this.cursor = Math.min(this.cursor + n, this.text.length);
  }
}
