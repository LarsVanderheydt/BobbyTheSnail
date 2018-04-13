export default class ObstaclGroup extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.createMultiple(10, `salt`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`outOfBoundsKill`, true);
  }
}
