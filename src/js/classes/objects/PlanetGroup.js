export default class PlanetGroup extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(1, `planets`, [`planet1`, `planet2`, `planet3`, `planet4`, `planet5`, `planet6`, `planet7`, `planet8`]);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`body.immovable`, true);
    this.setAll(`anchor.x`, 0.5);
    this.setAll(`anchor.y`, 1);
    this.setAll(`scale.x`, 0.5);
    this.setAll(`scale.y`, 0.5);

    this.nextPlanetAt = 0;
    this.planetDelay = 1000;
  }

  planetSpawn() {
    if (this.nextPlanetAt > this.game.time.now) return;
    if (this.countDead() === 0) return;

    const planet = this.getFirstExists(false);
    planet.reset(this.game.rnd.integerInRange(this.game.width, 0), 0);
    planet.body.velocity.y = this.game.rnd.integerInRange(50, 150);
    planet.scale.set(this.game.rnd.integerInRange(0.1, 0.6));
    this.nextPlanetAt = this.game.time.now + this.planetDelay;
  }
}
