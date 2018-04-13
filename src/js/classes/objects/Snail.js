export default class Snail extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, `snail`, frame);

    this.anchor.setTo(0.5, 0.5);
    this.animations.add(`walk`);
    this.animations.play(`walk`, 12, true);
    this.scale.x = - 1;

    this.game.physics.arcade.enableBody(this);
    this.reset(100, 450);
    this.body.allowGravity = false;
  }
}
