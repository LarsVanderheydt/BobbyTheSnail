export default class ShieldPowerUp extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.createMultiple(5, `shield`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`anchor.x`, 0.5);
  }
  update() {
    this.forEach(shield => {
      shield.body.setSize(50, 50);
      shield.scale.setTo(0.2, 0.2);
    });
  }
}
