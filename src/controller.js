const SHUFFLING_COUNT = 30;

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindShuffleClickTo(this.handleShuffle);
    this.view.bindPickLetterClickTo(this.handlePickLetter);
    this.view.bindRestartClickTo(this.handleRestart);

    this.renderAllLetters();
  }

  handleShuffle = (maxCount = SHUFFLING_COUNT) => {
    let interval = null;

    this.view.startShuffle();
    let count = 0;

    interval = setInterval(() => {
      try {
        const letter = this.model.shuffle();
        this.view.displayLetter(letter);
        count++;

        if (count === maxCount) {
          clearInterval(interval);
          this.view.endShuffle();
        }
      } catch (error) {
        console.error(error);

        clearInterval(interval);
        this.view.endShuffle();
        this.view.stopShuffle();
      }
    }, 40);
  };

  handlePickLetter = () => {
    this.model.pickLetter();
    this.renderAllLetters();
  };

  handleRestart = () => {
    this.model.restart();
    this.view.restart();
    this.renderAllLetters();
  };

  renderAllLetters() {
    this.view.renderAllLetters(this.model.getPickedLetters());
  }
}
