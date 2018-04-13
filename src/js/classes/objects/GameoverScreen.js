import handleForm from './HandleForm';


export default class GameoverScreen extends Phaser.Group {
  constructor(game, score, time) {
    super(game);

    const graphics = this.game.game.add.graphics(100, 100);
    graphics.beginFill(0xFFFFFFFF, 0.5);
    graphics.drawRect(- 100, - 100, this.game.game.width, this.game.game.height);
    graphics.endFill();

    this.gameOverTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, `Game Over`, {
      font: `40px Aller`,
      fill: `#000`,
      align: `center`
    });
    this.gameOverTitle.anchor.setTo(0.5, 0.5);

    this.gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, `your final score is `, {
      font: `20px Aller`,
      fill: `#000`,
      align: `center`
    });
    this.gameOverText.anchor.setTo(0.5, 0.5);

    this.gameOverScore = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 70, score, {
      font: `30px Aller`,
      fill: `#000`,
      align: `center`
    });
    this.gameOverScore.anchor.setTo(0.5, 0.5);

    this.gameEnterText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, `Enter your name: `, {
      font: `20px Aller`,
      fill: `#000`,
      align: `center`
    });
    this.gameEnterText.anchor.setTo(0.5, 0.5);

    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };

    const yellowButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, `components`, this.playAgain, this, `yellow-over`, `yellow-normal`, `yellow-down`);
    yellowButton.anchor.setTo(0.5, 0.5);
    const labelLeaderboard = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 102, `Play Again`, style);
    labelLeaderboard.anchor.setTo(0.5, 0.5);

    const greenButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 150, `components`, this.menu, this, `green-over`, `green-normal`, `green-down`);
    greenButton.anchor.setTo(0.5, 0.5);
    const labelMenu = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 152, `Topscores`, style);
    labelMenu.anchor.setTo(0.5, 0.5);

    new handleForm(score, time);
  }

  playAgain() {
    this.game.state.start(`Play`);
  }
  menu() {
    this.game.state.start(`Leaderboard`);
  }

}
