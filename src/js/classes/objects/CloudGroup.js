export default class CloudGroup extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(2, `clouds`, [`cloud1`, `cloud2`, `cloud3`, `cloud4`]);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`body.immovable`, true);
    this.setAll(`anchor.x`, 0.5);
    this.setAll(`anchor.y`, 1);

    this.nextCloudAt = 0;
    this.cloudDelay = 900;
  }

  cloudSpawn() {
    if (this.nextCloudAt > this.game.time.now) return;
    if (this.countDead() === 0) return;

    const cloud = this.getFirstExists(false);
    cloud.reset(this.game.rnd.integerInRange(this.game.width, 0), 0);
    cloud.body.velocity.y = this.game.rnd.integerInRange(50, 150);
    cloud.scale.set(this.game.rnd.integerInRange(0.1, 0.6));
    this.nextCloudAt = this.game.time.now + this.cloudDelay;
  }
}
