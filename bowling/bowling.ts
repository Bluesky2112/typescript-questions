import { Frame, FRAME_COUNT } from './frame';

export default class Bowling {
  /**
   * Acknowledgement: I have never played bowling
   */
  constructor(private rolls: number[]) {}

  score(): number {
    if (!this.rolls) {
      throw new Error('Rolls can not be null or empty');
    }

    let index = 0;
    let frameIdx = 0;
    let frames: Frame[] = [];
    while (index < this.rolls.length) {
      if (frameIdx > FRAME_COUNT - 1) {
        throw new Error('Should not be able to roll after game is over');
      }

      const frame = Frame.getFrame(this.rolls, index, frameIdx === FRAME_COUNT - 1);
      frame.forceValidation();
      frames.push(frame);
      frameIdx++;
      index += frame.rolls.length;
    }

    if (frames.length < FRAME_COUNT) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    return frames.reduce((a, b) => a + b.point, 0);
  }
}
