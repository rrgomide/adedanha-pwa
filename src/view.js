import {
  helperCreateElement,
  helperGetElementFromDom,
  helperClearElement,
} from './helpers/dom-helpers.js';

export default class View {
  constructor(appId = 'root', appTitle = '', shuffledMessage = '') {
    this.app = helperGetElementFromDom(`#${appId}`);
    this.title = helperCreateElement('h1', appTitle);
    this.divButtons = helperCreateElement('div', null, 'buttons');

    this.shuffleButton = helperCreateElement(
      'button',
      'Sortear',
      'button',
      'btn',
      'blue',
      'darken-4'
    );

    this.pickLetterButton = helperCreateElement(
      'button',
      'Utilizar',
      'button',
      'btn',
      'green',
      'darken-4'
    );
    this.pickLetterButton.disabled = true;

    this.restartButton = helperCreateElement(
      'button',
      'Reiniciar',
      'button',
      'btn',
      'red',
      'darken-4'
    );
    this.pickLetterButton.disabled = true;

    this.divButtons.append(
      this.shuffleButton,
      this.pickLetterButton,
      this.restartButton
    );

    this.divLetter = helperCreateElement('div', null, 'letter');
    this.pickedLettersTitle = helperCreateElement('h2', shuffledMessage);
    this.divPickedLetters = helperCreateElement('div', null, 'picked-letters');

    this.renderApp();
  }

  renderApp() {
    this._clearElement(this.app);

    this.app.append(
      this.title,
      this.divButtons,
      this.divLetter,
      this.pickedLettersTitle,
      this.divPickedLetters
    );

    this.displayLetter();
  }

  restart() {
    this.renderApp();
    this.shuffleButton.disabled = false;
    this.pickLetterButton.disabled = true;
  }

  displayLetter(letter = '?') {
    this.divLetter.textContent = letter;
  }

  startShuffle() {
    this.pickLetterButton.disabled = true;
    this.shuffleButton.disabled = true;
    this.restartButton.disabled = true;
  }

  endShuffle() {
    this.shuffleButton.disabled = false;
    this.pickLetterButton.disabled = false;
    this.restartButton.disabled = false;
  }

  stopShuffle() {
    this.shuffleButton.disabled = true;
    this.pickLetterButton.disabled = true;
    this.divLetter.textContent = 'Fim';
    this.restartButton.disabled = false;
  }

  bindShuffleClickTo(buttonHandler) {
    this.shuffleButton.addEventListener('click', () => buttonHandler());
  }

  bindPickLetterClickTo(pickLetterHandler) {
    this.pickLetterButton.addEventListener('click', () => pickLetterHandler());
  }

  bindRestartClickTo(restartHandler) {
    this.restartButton.addEventListener('click', () => restartHandler());
  }

  renderAllLetters(pickedLetters) {
    this.pickLetterButton.disabled = true;

    this._clearElement(this.divPickedLetters);

    pickedLetters.forEach(letter => {
      const letterElement = this.createLetterElement(letter);
      this.divPickedLetters.appendChild(letterElement);
    });
  }

  createLetterElement(letter) {
    const className = letter.picked ? 'good' : 'bad';
    const span = helperCreateElement(
      'span',
      `${letter.description}`,
      'letter-element',
      className
    );

    return span;
  }

  _clearElement(element) {
    helperClearElement(element);
  }
}
