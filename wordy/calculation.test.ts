import { parse, calculate } from './calculation';
import { Operator } from './util';

describe('Calculation engine fixture', () => {
  it('Should parse iteration 0 normally', () => {
    const numbers: number[] = [];
    const operators: Operator[] = [];
    expect(parse('5', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(1);
    expect(numbers[0]).toBe(5);
    expect(operators.length).toBe(0);
  });

  it('Should parse iteration 1 normally', () => {
    const numbers: number[] = [];
    const operators: Operator[] = [];
    expect(parse('5 plus 13', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(2);
    expect(numbers[0]).toBe(5);
    expect(numbers[1]).toBe(13);
    expect(operators.length).toBe(1);
    expect(operators[0]).toBe(Operator.Plus);
  });

  it('Should parse iteration 2 normally', () => {
    let numbers: number[] = [];
    let operators: Operator[] = [];
    expect(parse('7 minus 5', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(2);
    expect(numbers[0]).toBe(7);
    expect(numbers[1]).toBe(5);
    expect(operators.length).toBe(1);
    expect(operators[0]).toBe(Operator.Minus);

    numbers = [];
    operators = [];
    expect(parse('6 multiplied by 4', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(2);
    expect(numbers[0]).toBe(6);
    expect(numbers[1]).toBe(4);
    expect(operators.length).toBe(1);
    expect(operators[0]).toBe(Operator.Multiply);

    numbers = [];
    operators = [];
    expect(parse('25 divided by 5', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(2);
    expect(numbers[0]).toBe(25);
    expect(numbers[1]).toBe(5);
    expect(operators.length).toBe(1);
    expect(operators[0]).toBe(Operator.Divide);
  });

  it('Should parse iteration 3 normally', () => {
    let numbers: number[] = [];
    let operators: Operator[] = [];
    expect(parse('5 plus 13 plus 6', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(3);
    expect(numbers[0]).toBe(5);
    expect(numbers[1]).toBe(13);
    expect(numbers[2]).toBe(6);
    expect(operators.length).toBe(2);
    expect(operators[0]).toBe(Operator.Plus);
    expect(operators[1]).toBe(Operator.Plus);

    numbers = [];
    operators = [];
    expect(parse('3 plus 2 multiplied by 3', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(3);
    expect(numbers[0]).toBe(3);
    expect(numbers[1]).toBe(2);
    expect(numbers[2]).toBe(3);
    expect(operators.length).toBe(2);
    expect(operators[0]).toBe(Operator.Plus);
    expect(operators[1]).toBe(Operator.Multiply);
  });

  it('Should parse iteration 4 normally', () => {
    let numbers: number[] = [];
    let operators: Operator[] = [];
    expect(parse('52 cubed', numbers, operators)).toBe(false);

    numbers = [];
    operators = [];
    expect(parse('1 plus plus 2', numbers, operators)).toBe(false);
  });

  it('Should parse bonus normally', () => {
    let numbers: number[] = [];
    let operators: Operator[] = [];
    expect(parse('2 raised to the 5th power', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(2);
    expect(numbers[0]).toBe(2);
    expect(numbers[1]).toBe(5);
    expect(operators.length).toBe(1);
    expect(operators[0]).toBe(Operator.Power);

    numbers = [];
    operators = [];
    expect(parse('2 raised to the 5th power plus 2', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(3);
    expect(numbers[0]).toBe(2);
    expect(numbers[1]).toBe(5);
    expect(numbers[2]).toBe(2);
    expect(operators.length).toBe(2);
    expect(operators[0]).toBe(Operator.Power);
    expect(operators[1]).toBe(Operator.Plus);
  });

  it('Should parse negative numbers normally', () => {
    let numbers: number[] = [];
    let operators: Operator[] = [];
    expect(parse('-1 plus 2', numbers, operators)).toBe(true);
    expect(numbers.length).toBe(2);
    expect(numbers[0]).toBe(-1);
    expect(numbers[1]).toBe(2);
    expect(operators.length).toBe(1);
    expect(operators[0]).toBe(Operator.Plus);
  });

  it('Should calculation arithmetics normally', () => {
    expect(calculate([1, 2], [Operator.Plus])).toBe(3);
    expect(calculate([1, 2], [Operator.Minus])).toBe(-1);
    expect(calculate([1, 2], [Operator.Multiply])).toBe(2);
    expect(calculate([1, 2], [Operator.Divide])).toBe(0.5);
    expect(calculate([1, 2], [Operator.Power])).toBe(1);
  });
});
