export interface WordyOptions {
  separator: string;
  pattern: RegExp;
}

export const DEFAULT_OPTIONS: WordyOptions = {
  separator: ' ',
  pattern: /What is ([a-zA-Z0-9 \.-]+)\?*/
};

export class Arithmetics {
  static Plus = 'plus';
  static Minus = 'minus';
  static Multiply = /^multiplied by/;
  static Divide = /^divided by/;
  static Power = /^raised to the ([0-9]+)(th|st|nd|rd) power/;
}

export enum Operator {
  Plus,
  Minus,
  Multiply,
  Divide,
  Power
}

export const SUPPORTED_SINGLE_WORDS = [Arithmetics.Plus, Arithmetics.Minus];

export const SUPPORTED_MULTIPLE_WORDS = [Arithmetics.Power, Arithmetics.Multiply, Arithmetics.Divide];

export function isSupportedSingleWord(input: string): boolean {
  return SUPPORTED_SINGLE_WORDS.findIndex(word => input.toLowerCase() == word) >= 0;
}

export function isSupportedMultiWords(input: string): RegExp | null {
  const idx = SUPPORTED_MULTIPLE_WORDS.findIndex(word => word.test(input));

  if (idx >= 0) {
    return SUPPORTED_MULTIPLE_WORDS[idx];
  }

  return null;
}

export function isNumber(input: string): boolean {
  return /^[-+]?([0-9]*\.[0-9]+|[0-9]+)$/.test(input);
}

export function getToken(input: string, separator: string) {
  // Parse single word token
  let sepIdx = input.indexOf(separator);
  if (sepIdx < 0) {
    sepIdx = input.length;
  }

  return input.substring(0, sepIdx);
}

export function getOperator(input: string): Operator {
  switch (input.toLowerCase()) {
    case Arithmetics.Plus:
      return Operator.Plus;
    case Arithmetics.Minus:
      return Operator.Minus;
    default:
      if (Arithmetics.Multiply.test(input)) {
        return Operator.Multiply;
      } else if (Arithmetics.Divide.test(input)) {
        return Operator.Divide;
      } else if (Arithmetics.Power.test(input)) {
        return Operator.Power;
      }
      throw new Error('Not supported operator');
  }
}
