export default class Preload extends Phaser.State {
  preload() {
    this.loader = this.add.sprite(this.world.centerX, this.world.centerY, `loader`);
    this.loader.anchor.setTo(0.5, 0.5);

    this.loader.animations.add(`load`);
    this.loader.animations.play(`load`, 15, true);

    const $inputDiv = document.querySelector(`.inputField`);
    $inputDiv.classList.add(`hidden`);

    this.load.image(`slimeLevel`, `assets/images/slime_level.png`);
    this.load.image(`slimeMask`, `assets/images/slime_mask.png`);
    this.load.image(`shield`, `assets/images/shield.png`);
    this.load.image(`star`, `assets/images/star.png`);
    this.load.image(`sattelite`, `assets/images/satteliet.png`);
    this.load.image(`slime`, `assets/images/slime.png`);
    this.load.image(`branch`, `assets/images/branch.png`);
    this.load.image(`salt`, `assets/images/salt.png`);
    this.load.image(`rocket`, `assets/images/rocket.png`);
    this.load.image(`rocketLabel`, `assets/images/rocket_label.png`);
    this.load.image(`gravityLabel`, `assets/images/gravity_pull.png`);
    this.load.spritesheet(`playerShield`, `assets/images/shield_sprite.png`, 192, 192, 20);
    this.load.spritesheet(`gravityPull`, `assets/images/gravity_sprite.png`, 144.9, 245.5, 20);
    this.load.atlas(`lives`, `assets/images/lives.png`, `assets/images/lives.json`);
    this.load.atlas(`control-buttons`, `assets/images/buttons.png`, `assets/images/buttons.json`);
    this.load.atlas(`clouds`, `assets/images/clouds.png`, `assets/images/clouds.json`);
    this.load.atlas(`planets`, `assets/images/planets_sprite.png`, `assets/images/planets_sprite.json`);
    this.load.spritesheet(`snail`, `assets/images/snail.png`, 30, 32, 4);
    this.load.atlas(`components`, `assets/images/components.png`, `assets/images/components.json`);
    this.load.audio(`uku`, `assets/audio/uku.mp3`);
    this.load.audio(`slime`, `assets/audio/slime.mp3`);

  }
  create() {
    this.state.start(`Menu`);
  }
}
