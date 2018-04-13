//import handleForm from '../objects/HandleForm';

export default class Leaderboard extends Phaser.State {
  create() {
    this.createRedButton();
    this.createTitle();

    this.loadScores();

    const $inputDiv = document.querySelector(`.inputField`);
    $inputDiv.classList.add(`hidden`);

    const $validForm = document.querySelector(`.aThankYou`);
    $validForm.classList.add(`hidden`);
  }

  loadScores() {
    fetch(`index.php?t=${Date.now()}`, {
      headers: new Headers({
        Accept: `application/json`
      })
    })
    .then(r => r.json())
    .then(results => {
      if (!results || results.length === 0) {
        const nameText = this.add.text(this.game.width / 2, this.game.height / 3, `nog geen topscore`, style);
        nameText.anchor.set(0.5);
        return;
      }

      const style = {
        font: `20px Aller`,
        fill: `white`,
      };

      const arrayNames = [];
      const arrayScores = [];

      for (let i = 0;i < results.length;i ++) {
        const names = results[i];
        arrayNames.push(names.name);

        const nameText = this.add.text(this.game.width / 2 - 70, this.game.height / 5 + (i * 30), arrayNames[i], style);
        nameText.anchor.set(0);

        const scores = results[i];
        arrayScores.push(scores.score);

        const scoreText = this.add.text(this.game.width / 2 + 70, this.game.height / 5 + (i * 30), arrayScores[i], style);
        scoreText.anchor.set(1, 0);
      }
    });
  }

  createTitle() {
    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };

    const title = this.add.text(this.world.centerX, this.world.centerY - 200, `Topscores:`, style);
    title.anchor.setTo(0.5, 0.5);

  }
  createRedButton() {
    const redButton = this.add.button(this.world.centerX, 450, `components`, this.backClicked, this, `red-over`, `red-normal`, `red-down`);
    redButton.anchor.setTo(0.5, 0.5);

    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };
    const labelPlay = this.add.text(this.world.centerX, 452, `Back`, style);
    labelPlay.anchor.setTo(0.5, 0.5);
  }
  backClicked() {
    this.state.start(`Menu`);
  }
}
