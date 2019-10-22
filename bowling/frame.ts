export const FRAME_COUNT = 10;
export const PIN_COUNT = 10;

export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

export enum FrameType {
  Normal,
  Spare,
  Strike
}

export class Frame {
  constructor(
    public rolls: number[],
    public point: number,
    public type: FrameType = FrameType.Normal,
    public isLastFrame: boolean = false
  ) {}

  forceValidation(): void {
    this.rolls.forEach(roll => {
      if (roll < 0 || roll > PIN_COUNT) {
        throw new Error('Pins must have a value from 0 to 10');
      }

      if (
        (this.type === FrameType.Normal && this.point > PIN_COUNT) ||
        (this.type === FrameType.Strike && this.isLastFrame && this.rolls[1] < PIN_COUNT && this.rolls[1] + this.rolls[2] > PIN_COUNT)
      ) {
        throw new Error('Pin count exceeds pins on the lane');
      }
    });
  }

  static getFrame(rolls: number[], rollIdx: number, isLastFrame: boolean = false): Frame {
    let slice;

    // Strike
    if (rolls[rollIdx] === PIN_COUNT) {
      // Validate end game
      if (rollIdx + 2 > rolls.length - 1) {
        throw new Error('Score cannot be taken until the end of the game');
      }

      // 10th frame
      if (isLastFrame) {
        if (rollIdx + 2 < rolls.length - 1) {
          throw new Error('Should not be able to roll after game is over');
        }

        slice = rolls.slice(rollIdx, rollIdx + 3);
        return new Frame(slice, sum(slice), FrameType.Strike, isLastFrame);
      }

      slice = rolls.slice(rollIdx, rollIdx + 3);
      return new Frame([rolls[rollIdx]], sum(slice), FrameType.Strike);
    }

    // Validate end game
    if (rollIdx + 1 > rolls.length - 1) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    // Count pins
    const pinCount = rolls[rollIdx] + rolls[rollIdx + 1];

    // Spare
    if (pinCount === PIN_COUNT) {
      // Validate end game
      if (rollIdx + 2 > rolls.length - 1) {
        throw new Error('Score cannot be taken until the end of the game');
      }

      // 10th frame
      if (isLastFrame) {
        if (rollIdx + 2 < rolls.length - 1) {
          throw new Error('Should not be able to roll after game is over');
        }

        slice = rolls.slice(rollIdx, rollIdx + 3);
        return new Frame(slice, pinCount + rolls[rollIdx + 2], FrameType.Spare, isLastFrame);
      }

      slice = rolls.slice(rollIdx, rollIdx + 2);
      return new Frame(slice, pinCount + rolls[rollIdx + 2], FrameType.Spare);
    }

    // Normal
    slice = rolls.slice(rollIdx, rollIdx + 2);
    return new Frame(slice, sum(slice));
  }
}
