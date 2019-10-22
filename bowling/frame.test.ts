import { Frame } from './frame';

describe('Bowling frame fixture', () => {
  it('Should get normal frame', () => {
    const frame = Frame.getFrame([0, 1, 2], 0);
    expect(frame.rolls).toEqual([0, 1]);
    expect(frame.point).toBe(1);
  });

  it('Should get strike frame', () => {
    const frame = Frame.getFrame([10, 1, 2], 0);
    expect(frame.rolls).toEqual([10]);
    expect(frame.point).toBe(13);
  });

  it('Should get spare frame', () => {
    const frame = Frame.getFrame([6, 4, 2], 0);
    expect(frame.rolls).toEqual([6, 4]);
    expect(frame.point).toBe(12);
  });

  it('Should get 10th strike frame', () => {
    const frame = Frame.getFrame([10, 4, 2], 0, true);
    expect(frame.rolls).toEqual([10, 4, 2]);
    expect(frame.point).toBe(16);
  });

  it('Should get 10th spare frame', () => {
    const frame = Frame.getFrame([6, 4, 2], 0, true);
    expect(frame.rolls).toEqual([6, 4, 2]);
    expect(frame.point).toBe(12);
  });

  it('Should throw error when game not over', () => {
    const ERROR = 'Score cannot be taken until the end of the game';
    expect(() => Frame.getFrame([6], 0)).toThrowError(ERROR);
    expect(() => Frame.getFrame([6, 4], 0)).toThrowError(ERROR);
    expect(() => Frame.getFrame([10, 4], 0)).toThrowError(ERROR);
    expect(() => Frame.getFrame([10, 4], 0, true)).toThrowError(ERROR);
    expect(() => Frame.getFrame([6, 4], 0, true)).toThrowError(ERROR);
  });

  it('Should throw error when frames exceed', () => {
    const ERROR = 'Should not be able to roll after game is over';
    expect(() => Frame.getFrame([10, 4, 5, 6], 0, true)).toThrowError(ERROR);
    expect(() => Frame.getFrame([6, 4, 5, 6], 0, true)).toThrowError(ERROR);
  });
});
