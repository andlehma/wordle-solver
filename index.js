const checkWord = require('check-if-word');
const words = checkWord('en');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// variables
const greyLetters = ''.split('');
const yellowLetters = [
  { letter: '', indices: [] },
];
const greenLetters = ['', '', '', '', ''];

// helper functions
function nthIndex(array, target, n) {
  if (n < 0) {
    return -1;
  }
  let m = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      if (m === n) {
        return i;
      } else {
        m++;
      }
    }
  }
  return -1;
}

const wordIsValid = (word) => {
  if (!words.check(word)) {
    return false;
  }
  for (letterObj of yellowLetters) {
    for (letter of letterObj.letter) {
      if (word.indexOf(letter) === -1) {
        return false;
      }
    }
    for (index of letterObj.indices) {
      if (word[index] === letterObj.letter) {
        return false;
      }
    }
  }
  return true;
}

// derived
const allGuessLetters = alphabet.filter(x => !greyLetters.includes(x));
const variableLettersCount = greenLetters.filter(x => x === '').length;
const blankSpaceIndices = [];
for (let i = 0; i < variableLettersCount; i++) {
  blankSpaceIndices.push(nthIndex(greenLetters, '', i));
}

// do the thing
function recur(index, soFar = []) {
	if (index <= 0) {
    let testWord = [...greenLetters];
    for (let i = 0; i < soFar.length; i++) {
      testWord[blankSpaceIndices[i]] = soFar[i];
    }
    const joinedWord = testWord.join('');
    if (wordIsValid(joinedWord)) {
      console.log(joinedWord);
    }
    return;
  }
  for (let i = 0; i < allGuessLetters.length; i++) {
  	recur(index - 1, [allGuessLetters[i], ...soFar]);
  }
}

recur(variableLettersCount);