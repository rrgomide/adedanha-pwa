const SHUFFLING_COUNT = 30;

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindShuffleClickTo(this.onShuffle);
    this.view.bindPickLetterClickTo(this.onPickLetter);
    this.view.bindRestartClickTo(this.onRestart);
    this.view.renderAllLetters(model.getPickedLetters());
  }

  onShuffle = (maxCount = SHUFFLING_COUNT) => {
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

  onPickLetter = () => {
    this.model.pickLetter();
    this.view.renderAllLetters(this.model.getPickedLetters());
  };

  onRestart = () => {
    this.model.restart();
    this.view.restart();
    this.view.renderAllLetters(this.model.getPickedLetters());
  };
}
