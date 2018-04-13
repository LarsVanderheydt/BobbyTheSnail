export default class SatteliteGroup extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(10, `sattelite`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`body.immovable`, true);
    this.setAll(`anchor.x`, 0.5);
    this.setAll(`anchor.y`, 1);
    this.setAll(`scale.x`, 0.5);
    this.setAll(`scale.y`, 0.5);

    this.nextSatteliteAt = 0;
    this.satteliteDelay = 1000;
  }

  satteliteSpawn() {
    if (this.nextSatteliteAt > this.game.time.now) return;
    if (this.countDead() === 0) return;

    const sattelite = this.getFirstExists(false);
    sattelite.reset(this.game.rnd.integerInRange(this.game.width, 0), 0 - sattelite.height);
    sattelite.body.velocity.y = this.game.rnd.integerInRange(50, 150);

    sattelite.rotation = this.game.rnd.integerInRange(20, 80);
    this.nextSatteliteAt = this.game.time.now + this.satteliteDelay;
  }
}
