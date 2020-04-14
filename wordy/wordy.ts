const config_regex = [
  {
    name: "first",
    regex: "^(what is) (-?[\\d]+)"
  },
  {
    name: "multiplied_regex",
    regex:"(multiplied by) (-?[\\d]+)"
  },
  {
    name: "divided_regex",
    regex:"(divided by) (-?[\\d]+)"
  },
  {
    name:"minus",
    regex:"(minus) (-?[\\d]+)"
  },
  {
    name:"plus",
    regex:"(plus) (-?[\\d]+)"
  },
  {
    name:"power",
    regex:"(raised to the) (-?[\\d]+)th power"
  },

];

export class WordProblem {
  question: string = "";
  constructor(question: string){
    this.question = question;
  }

  answer=():number => {
    let groups = this.extractMethod();
    let final_result = 0;
    this.validate(groups);
    if(groups) {
      for (let group of groups) {
        final_result = this.calculate(final_result, group);
      }
    }
    return final_result;

  };
  validate=(groups:Array<Array<string>>)=>{
    if(!groups || groups.length==0) {
      throw new ArgumentError()
    }
    let question_str = this.question.toLocaleLowerCase();
    for(let group of groups) {
      question_str = question_str.replace(group[0], "")
    }
    question_str = question_str.replace(/[ \?]+/g, "");
    if(question_str != ''){
      throw new ArgumentError()
    }

  };

  extractMethod =()=>{
    let regex_str = "(" + config_regex[0].regex + ")|"+
        "("+ config_regex[1].regex + ")|" +
        "("+ config_regex[2].regex + ")|" +
        "("+ config_regex[3].regex + ")|" +
        "("+ config_regex[4].regex + ")|" +
        "("+ config_regex[5].regex +").*?";
    let full_line_regex = new RegExp(regex_str, "gim");
    let group_methods = this.question.match(full_line_regex);
    let group_method:any = [];
    if(group_methods) {
      for(let group of group_methods){
        config_regex.forEach(config=> {
          let re_extract_group = new RegExp(config.regex, "i");
          let matchConfig = group.match(re_extract_group);
          if(matchConfig) {
            group_method.push(
                [
                  matchConfig[0].toLocaleLowerCase(), //string match
                  matchConfig[1].toLocaleLowerCase(), // method
                  matchConfig[2] // param of method
                ]);

          }
        })
      }
    }
    return group_method

  };

  calculate=(final_result: number, group:string):number=>{
    switch(group[1].toLocaleLowerCase()) {
      case 'what is': {
        final_result = final_result + Number(group[2]);
        break;
      }
      case 'divided by': {
        final_result = final_result / Number(group[2]);
        break;
      }
      case 'plus': {
        final_result = final_result + Number(group[2]);
        break;
      }
      case 'minus': {
        final_result = final_result - Number(group[2]);
        break;
      }
      case 'multiplied by': {
        final_result = final_result * Number(group[2]);
        break;
      }
      case 'raised to the': {
        final_result =  Math.pow(final_result, Number(group[2]));
        break;
      }
      default: {
        //statements;
        break;
      }
    }

    return final_result;
  }
}

export class ArgumentError {

}
