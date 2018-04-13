export default class Controls extends Phaser.State {
  create() {
    this.createTitle();
    this.createUpButton();
    this.createDownButton();
    this.createJumpButton();
    this.createRedButton();
  }

  createTitle() {
    const style = {
      font: `40px Arial`,
      fill: `white`,
      align: `center`
    };

    const title = this.add.text(this.world.centerX, this.world.centerY - 200, `Controls:`, style);
    title.anchor.setTo(0.5, 0.5);
  }

  createUpButton() {
    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };

    const upText = this.add.text(this.world.centerX - 90, this.world.centerY - 120, `Go Up`, style);
    upText.anchor.setTo(0.5, 0.5);

    const up = this.add.sprite(this.world.centerX + 80, this.world.centerY - 120, `control-buttons`, `up-arrow`);
    up.anchor.setTo(0.5, 0.5);
  }

  createDownButton() {
    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };

    const downText = this.add.text(this.world.centerX - 80, this.world.centerY - 30, `Go Down`, style);
    downText.anchor.setTo(0.5, 0.5);

    const down = this.add.sprite(this.world.centerX + 80, this.world.centerY - 30, `control-buttons`, `down-arrow`);
    down.anchor.setTo(0.5, 0.5);
  }

  createJumpButton() {
    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };

    const jumpText = this.add.text(this.world.centerX - 100, this.world.centerY + 80, `Jump`, style);
    jumpText.anchor.setTo(0.5, 0.5);

    const left = this.add.sprite(this.world.centerX + 35, this.world.centerY + 60, `control-buttons`, `left-arrow`);
    left.anchor.setTo(0.5, 0.5);

    const right = this.add.sprite(this.world.centerX + 105, this.world.centerY + 60, `control-buttons`, `right-arrow`);
    right.anchor.setTo(0.5, 0.5);

    const space = this.add.sprite(this.world.centerX + 70, this.world.centerY + 120, `control-buttons`, `space`);
    space.anchor.setTo(0.5, 0.5);
  }

  createRedButton() {
    const redButton = this.add.button(this.world.centerX, this.world.centerY + 200, `components`, this.backClicked, this, `red-over`, `red-normal`, `red-down`);
    redButton.anchor.setTo(0.5, 0.5);

    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };
    const labelPlay = this.add.text(this.world.centerX, this.world.centerY + 202, `Back`, style);
    labelPlay.anchor.setTo(0.5, 0.5);
  }

  backClicked() {
    this.state.start(`Menu`);
  }

}
