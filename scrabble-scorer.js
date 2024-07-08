// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
         score += Number(pointValue);
		 }
	  }
	}
	return score + '\n' + letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question(`Let's play some Scrabble!
Enter a word to score: `);
   return word;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   let score = 0;
   for (let i = 0; i < word.length; i++){
      if (word[i] === ' ') {
         score;
      }
      else {
         score++;
      }
   }
   return score;
};

let vowelBonusScorer = function (word) {
   let wordArr = word.trim().toLowerCase().split('');
   let score = 0;
   wordArr.forEach((x) => {
     if (x === 'a' || x === 'e' || x === 'i' || x === 'o' || x === 'u') {
       score += 3;
     } else if (x === ' ') {
       score;
     } 
     else {
       score++;
     }
   });
   return score;
};


let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let score = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in newPointStructure) {
		 if (pointValue.includes(word[i])) {
       score += newPointStructure[pointValue];
		}
	  }
	}
   return score;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }

];

function scorerPrompt(arrScoringAlgorithims, word) {
   let questionPrompt = `Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `;

   let userEntry = Number(input.question(questionPrompt));
   let score = 0;
   while (userEntry < 0 || userEntry > 2 || isNaN(userEntry)) {
      userEntry = input.question(questionPrompt);
   }
   if (userEntry === 0){
      score = arrScoringAlgorithims[0].scorerFunction(word);
   } else if (userEntry === 1){
      score = arrScoringAlgorithims[1].scorerFunction(word);
   } else {
      score = arrScoringAlgorithims[2].scorerFunction(word);
   } 
   return score;
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for(property in oldPointStructure){
      for (let i = 0; i < oldPointStructure[property].length; i++){ 
         newPointStructure[oldPointStructure[property][i].toLowerCase()] = Number(property);
      }
   }
   //newPointStructure[' '] = 0;
   return newPointStructure;
}

function runProgram() {
   let wordUserInput = initialPrompt();
   let scoreMsg = (`Score for '${wordUserInput}': ${scorerPrompt(scoringAlgorithms, wordUserInput)}`);  
   console.log(scoreMsg);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
