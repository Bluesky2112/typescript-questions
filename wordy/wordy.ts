import { isNumber, isSupportedSingleWord, Operator, DEFAULT_OPTIONS, WordyOptions } from './util';
import { parse, calculate } from './calculation';

export class WordProblem {
  private options: WordyOptions;

  constructor(private question: string, opts?: WordyOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...opts };
  }

  answer(): number {
    // Validate question format
    if (!this.options.pattern.test(this.question)) {
      throw new ArgumentError();
    }

    const numbers: number[] = [];
    const operators: Operator[] = [];
    const matches = this.question.match(this.options.pattern) as RegExpMatchArray;

    if (!parse(matches[1], numbers, operators)) {
      throw new ArgumentError();
    }

    return calculate(numbers, operators);
  }
}

export class ArgumentError {}
