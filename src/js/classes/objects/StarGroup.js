export default class StarGroup extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(1000, `star`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`body.immovable`, true);
    this.setAll(`anchor.x`, 0.5);
    this.setAll(`anchor.y`, 1);
    this.setAll(`scale.x`, 0.1);
    this.setAll(`scale.y`, 0.1);

    this.nextStarAt = 0;
    this.starDelay = 300;
  }

  starSpawn() {
    if (this.nextStarAt > this.game.time.now) return;
    if (this.countDead() === 0) return;

    const star = this.getFirstExists(false);
    star.reset(this.game.rnd.integerInRange(this.game.width, 0), 0 - star.height);
    star.body.velocity.y = this.game.rnd.integerInRange(10, 50);

    star.rotation = this.game.rnd.integerInRange(20, 80);
    this.nextStarAt = this.game.time.now + this.starDelay;
  }
}
