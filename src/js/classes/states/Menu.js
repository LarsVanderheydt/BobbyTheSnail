import CloudGroup from '../objects/CloudGroup';

export default class Menu extends Phaser.State {
  create() {
    this.createBackground();
    this.addMusic();
    this.createGreenButton();
    this.createYellowButton();
    this.createRedButton();
    this.createSurprise();

    const $inputDiv = document.querySelector(`.inputField`);
    $inputDiv.classList.add(`hidden`);

    const $validForm = document.querySelector(`.aThankYou`);
    $validForm.classList.add(`hidden`);
  }

  createBackground() {
    this.stage.backgroundColor = `87CEEB`;
    this.cloudGroup = new CloudGroup(this.game);
    this.nextCloudAt = 0;
    this.cloudDelay = 900;
  }

  cloudSpawn() {
    if (this.nextCloudAt > this.time.now) return;
    if (this.cloudGroup.countDead() === 0) return;

    const cloud = this.cloudGroup.getFirstExists(false);
    cloud.reset(this.rnd.integerInRange(this.game.width, 0), 0);
    cloud.body.velocity.y = this.rnd.integerInRange(50, 150);
    cloud.scale.set(this.rnd.integerInRange(0.1, 0.6));
    this.nextCloudAt = this.time.now + this.cloudDelay;
  }

  update() {
    this.cloudSpawn();
  }
  addMusic() {
    // this.uku = this.add.audio(`uku`);
    // this.uku.play();
    // this.uku.loopFull();
  }

  createGreenButton() {
    const greenButton = this.add.button(this.world.centerX, this.world.centerY - 50, `components`, this.playClicked, this, `green-over`, `green-normal`, `green-down`);
    greenButton.anchor.setTo(0.5, 0.5);

    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };
    const labelPlay = this.add.text(this.world.centerX, this.world.centerY - 48, `Play`, style);
    labelPlay.anchor.setTo(0.5, 0.5);
  }

  createYellowButton() {
    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };
    const yellowButton = this.add.button(this.world.centerX, this.world.centerY, `components`, this.leaderboardClicked, this, `yellow-over`, `yellow-normal`, `yellow-down`);
    yellowButton.anchor.setTo(0.5, 0.5);
    const labelLeaderboard = this.add.text(this.world.centerX, this.world.centerY + 2, `Topscores`, style);
    labelLeaderboard.anchor.setTo(0.5, 0.5);
  }

  createRedButton() {
    const style = {
      font: `20px Arial`,
      fill: `white`,
      align: `center`
    };
    const redButton = this.add.button(this.world.centerX, this.world.centerY + 50, `components`, this.controlsClicked, this, `red-over`, `red-normal`, `red-down`);
    redButton.anchor.setTo(0.5, 0.5);
    const labelControls = this.add.text(this.world.centerX, this.world.centerY + 52, `Controls`, style);
    labelControls.anchor.setTo(0.5, 0.5);
  }

  playClicked() {
    this.state.start(`Play`);
  }

  leaderboardClicked() {
    this.state.start(`Leaderboard`);
  }
  controlsClicked() {
    this.state.start(`Controls`);
  }
  createSurprise() {
    console.log(`And the Lord spake, saying, "First shalt thou take out the Holy Pin. Then shalt thou count to three, no more, no less. Three shall be the number thou shalt count, and the number of the counting shall be three. Four shalt thou not count, neither count thou two, excepting that thou then proceed to three. Five is right out! Once the number three, being the third number, be reached, then lobbest thou thy Holy Hand Grenade of Antioch towards thy foe, who, being naughty in my sight, shall snuff it.`);
  }
}
