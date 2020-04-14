class CollatzConjecture {
  static steps =(input: number): number =>{
    let result = input;
    let total_step = 0;
    if(result <=0 ){
      throw new Error('Only positive numbers are allowed')
    }
    while (result != 1) {
      result = CollatzConjecture.calculate(result);
      total_step ++;
    }
    return total_step;
  };

  static calculate=(value:number):number => {
    if(value %2 == 0) {
      return value/2
    } else {
      return (3 *value +1)
    }
    return value;
  }
}

export default CollatzConjecture;
