import GameoverScreen from '../objects/GameoverScreen';

export default class GameOver extends Phaser.State {
  create() {
    const $scoreInput = document.querySelector(`.scoreInput`);
    const score = $scoreInput.value;

    const $time = document.querySelector(`.timePlayed`);
    const time = $time.value;

    this.gameoverScreen = new GameoverScreen(this, score, time);
    this.add.existing(this.gameoverScreen);
  }
}
