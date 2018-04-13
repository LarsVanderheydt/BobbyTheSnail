export default class PlatformGroup extends Phaser.Group {
  constructor(game) {
    super(game);
    this.enableBody = true;
    this.createMultiple(100, `branch`);
    this.setAll(`body.allowGravity`, false);
    this.setAll(`outOfBoundsKill`, true);
    this.setAll(`checkWorldBounds`, true);
    this.setAll(`body.immovable`, true);
    this.setAll(`anchor.x`, 0.5);
    this.setAll(`anchor.y`, 1);
    this.setAll(`body.velocity.y`, 100);

    this.xPos = [75, 175, 275];
  }

  update() {
    this.forEachAlive(platform => {
      const topOfPlatform = platform.y - platform.height;
      if (topOfPlatform < 0 && platform.x === 75) {
        console.log();
      }
    });
  }

  createPlatform(PLATFORMSPACING) {
    //random is om te bepalen hoe lang het platform zal zijn

    // const xPos = this.xPos[Math.floor(Math.random() * this.xPos.lenght - 1)];

    const platformX = this.game.rnd.integerInRange(1, 3) * PLATFORMSPACING;
    const platform = this.getFirstExists(false);

    platform.reset(platformX - 25, 0);

    platform.height = this.game.rnd.integerInRange(100, 170);
  }
}
