export default class Boot extends Phaser.State {
  preload() {
    this.load.spritesheet(`loader`, `assets/images/preloader.png`, 210, 21, 10);
    
    const $inputDiv = document.querySelector(`.inputField`);
    $inputDiv.classList.add(`hidden`);
  }
  create() {
    this.state.start(`Preload`);
  }
}
