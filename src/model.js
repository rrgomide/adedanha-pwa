import { helperGetRandomValueFromArray } from './helpers/math-helpers.js';

const ALL_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//const ALL_VALUES = Array.from({ length: 60 }).map((_, index) => index + 1);

export default class Model {
  constructor() {
    this.pickedLetters = [];
    this.currentLetter = '';

    this.restart();
  }

  restart() {
    this.pickedLetters = ALL_VALUES.map(letter => {
      return {
        id: letter,
        description: letter,
        picked: false,
      };
    });

    this.currentLetter = '';
  }

  shuffle() {
    let shuffledLetter = null;

    if (!this._canShuffle()) {
      throw new Error('Todas as letras já foram sorteadas');
    }

    do {
      shuffledLetter = this._getNewLetter();
    } while (!this._isValidShuffle(shuffledLetter));

    this.currentLetter = shuffledLetter;
    return shuffledLetter;
  }

  pickLetter() {
    const index = this.pickedLetters.findIndex(
      l => l.description === this.currentLetter
    );

    this.pickedLetters[index].picked = true;
  }

  getPickedLetters() {
    return [...this.pickedLetters];
  }

  _canShuffle() {
    return this.pickedLetters.filter(l => l.picked).length < ALL_VALUES.length;
  }

  _getNewLetter() {
    return helperGetRandomValueFromArray(ALL_VALUES);
  }

  _isValidShuffle(letter) {
    return !this.pickedLetters.find(l => l.description === letter).picked;
  }
}
