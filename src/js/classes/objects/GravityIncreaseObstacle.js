export default class GravityIncreaseObstacle extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.createMultiple(5, `gravityLabel`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`anchor.x`, 0.5);
  }
}
