import {
  isNumber,
  isSupportedSingleWord,
  Operator,
  isSupportedMultiWords as getSupportedMultiWords,
  getOperator,
  getToken as nextToken
} from './util';

/**
 * Parse operators and numbers calculation from string input
 *
 * @export
 * @param {string} input
 * @param {number[]} numbers
 * @param {Operator[]} operators
 * @param {string} [separator=' ']
 * @returns {boolean}
 */
export function parse(input: string, numbers: number[], operators: Operator[], separator: string = ' '): boolean {
  let isNumberFlag = true;
  let token: string = '';
  while (input.length > 0) {
    if (isNumberFlag) {
      // Parse numeric token
      token = nextToken(input, separator);
      if (!isNumber(token)) {
        return false;
      }

      numbers.push(parseFloat(input));
    } else {
      // Parse multiple words token
      const multiWord = getSupportedMultiWords(input);
      if (multiWord) {
        // TODO: Support multi words
        const matches = input.match(multiWord) as RegExpMatchArray;
        token = matches[0];
        operators.push(getOperator(token));

        // Capture numbers
        if (matches.length > 1) {
          numbers.push(parseFloat(matches[1]));

          // Extra number
          isNumberFlag = !isNumberFlag;
        }
      } else {
        // Parse single word token
        token = nextToken(input, separator);
        if (!isSupportedSingleWord(token)) {
          return false;
        }

        operators.push(getOperator(token));
      }
    }

    // Switch input type
    isNumberFlag = !isNumberFlag;
    input = input.substring(token.length).trim();
  }

  return true;
}

/**
 * Calculate based on stacks of number of operator
 *
 * @export
 * @param {number[]} numbers Number stack
 * @param {Operator[]} operators Operator stack
 * @returns {number} Calculation result
 */
export function calculate(numbers: number[], operators: Operator[]): number {
  if (!numbers || !operators || numbers.length !== operators.length + 1) {
    throw new Error('Invalid arguments');
  }

  // Calculate from left to right
  return numbers.reduce((prev, curr, idx) => {
    if (idx === 0) {
      return curr;
    }

    const operator = operators[idx - 1];
    switch (operator) {
      case Operator.Plus:
        return prev + curr;
      case Operator.Minus:
        return prev - curr;
      case Operator.Multiply:
        return prev * curr;
      case Operator.Divide:
        return prev / curr;
      case Operator.Power:
        return Math.pow(prev, curr);
      default:
        throw new Error('Not supported operator');
    }
  }, 0);
}
