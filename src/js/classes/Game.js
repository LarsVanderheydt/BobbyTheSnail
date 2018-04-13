import Boot from './states/Boot';
import Preload from './states/Preload';
import Menu from './states/Menu';
import Leaderboard from './states/Leaderboard';
import Controls from './states/Controls';
import Play from './states/Play';
import GameOver from './states/GameOver';

export default class Game extends Phaser.Game {
  constructor() {
    super(350, 600, Phaser.AUTO);
    this.state.add(`Boot`, Boot);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Leaderboard`, Leaderboard);
    this.state.add(`Controls`, Controls);
    this.state.add(`Play`, Play);
    this.state.add(`GameOver`, GameOver);
    this.state.start(`Boot`);
  }
}
