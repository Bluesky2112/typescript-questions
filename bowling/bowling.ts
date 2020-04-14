export default class Bowling{
  rolls: number[] = [];
  constructor(rolls:number[]){
    this.rolls = rolls
  }

  score=() :number =>{
    let frame:Array<Array<number>> = this.extract_frame();
    this.validate(frame);
    let total:number=0;
    frame.forEach(item=>{
      total += item.reduce( (first, others) => {return first+others})
    });
    return total
  };

  validate =(frame: Array<Array<number>>)=>{
    let lastFrame = frame[frame.length-1];
    if( frame.length != 10 || (lastFrame.length == 2 && ((lastFrame[0] + lastFrame[1] == 10) || lastFrame[0] == 10))) { // strike last frame
      throw new Error("Score cannot be taken until the end of the game")
    }
    if(lastFrame[0] == 10) { // strike last frame
      if(lastFrame.length == 3 && (lastFrame[1] != 10) && ((lastFrame[1] + lastFrame[2]) >10)) {
        throw new Error("Pin count exceeds pins on the lane")
      }
    }
    let temp:Array<number>=[];
    let totalRollsCorrected:Array<number> = temp.concat(...frame);
    if(this.rolls.length > totalRollsCorrected.length){
      throw new Error('Should not be able to roll after game is over')
    }
    frame.forEach(items=>{
      if(items.some(v=> v<0) || items.some(v=> v > 10)) {
        throw new Error("Pins must have a value from 0 to 10")
      }

      if((items[0] != 10) && (items[0] + items[1]) > 10) {
        throw new Error("Pin count exceeds pins on the lane")
      }
    })
  };

  extract_frame = (): Array<Array<number>> =>{
    let rolls =  this.rolls;
    let frame: Array<Array<number>> = [];
    for (let i = 0; i < rolls.length -1 ; i=i+2) {

      // normal case
      let normal =[];
      if(rolls[i] != 10) {
        normal.push(rolls[i]);
      }
      if((i+1) < rolls.length && rolls[i] != 10) {
        normal.push(rolls[i+1]);
      }

      // strike
      let strike = [];
      if(rolls[i] == 10){
        strike.push(rolls[i]);
        if((i+1) < rolls.length) {
          strike.push(rolls[i+1]);
        }
        if((i+2) < rolls.length) {
          strike.push(rolls[i+2]);
        }
        if( (i+2) == (rolls.length-1)) { // last strike
          i = rolls.length;
        } else {
          i--;// because if get 10 points at the first time in a frame, don't roll again in this frame
        }
      }

      // spare
      let spare = [];
      if((i+1) < rolls.length && (rolls[i] + rolls[i+1]) == 10 && rolls[i] < 10) {
        spare.push(rolls[i]);
        spare.push(rolls[i+1]);
        if((i+2) < rolls.length) {
          spare.push(rolls[i+2]);
        }
      }

      // summary
      if(strike.length>0) {
        frame.push(strike)
      } else{
        if(spare.length>0) {
          frame.push(spare)
        } else {
          frame.push(normal)
        }
      }

    }
    return frame;
  }
}
