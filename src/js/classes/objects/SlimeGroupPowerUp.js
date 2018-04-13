export default class SlimeGroupPowerUp extends Phaser.Group {
  constructor(game) {
    super(game);
    this.enableBody = true;
    this.createMultiple(5, `slime`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`anchor.x`, 0.5);
  }
}
