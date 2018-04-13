import Snail from '../objects/Snail';
import PlatformGroup from '../objects/PlatformGroup';
import CloudGroup from '../objects/CloudGroup';
import PlanetGroup from '../objects/PlanetGroup';
import LifePowerUp from '../objects/LifePowerUp';
import ObstacleGroup from '../objects/ObstacleGroup';
import ShieldPowerUp from '../objects/ShieldPowerUp';
import RocketPowerUp from '../objects/RocketPowerUp';
import GravityIncreaseObstacle from '../objects/GravityIncreaseObstacle';
import SlimeGroupPowerUp from '../objects/SlimeGroupPowerUp';
import SatteliteGroup from '../objects/SatteliteGroup';
import StarGroup from '../objects/StarGroup';


const PLATFORMSPACING = 100,
  XSPEED = 400,
  YSPEED = 200,
  GRAVITYSTRENGTH = 1000,
  SPEEDINCREASE = 0.2,
  STARTINGPOSITIONX = 20;

let SPEED = 200,
  time = 0,
  usedShields = 0,
  usedSlimeRefills = 0,
  extraLifes = 0,
  hitsTaken = 0,
  rocketsTaken = 0;

let shieldActive = false,
  rocketActive = false,
  gravityActive = false;

export default class Play extends Phaser.State {
  create() {
    SPEED = 200;
    time = 0;
    this.score = 0;
    this.stage.backgroundColor = `87CEEB`;
    this.createBackground();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.addMusic();
    this.createPhysics();
    this.createSnail();
    this.createShield();
    this.createRocket();
    //this.createGravity();
    this.createInitPlatforms();
    this.createTopBar();
    this.createLifes();
    this.createPauseButton();
    this.startGeneratingPlatforms();
    this.startGeneratingScore();
    this.powerUpSetup();
    this.slimeBarSetup();

    this.time.events.loop(1000, this.timePlayed, this);
    const $inputDiv = document.querySelector(`.inputField`);
    $inputDiv.classList.add(`hidden`);

    const $validForm = document.querySelector(`.aThankYou`);
    $validForm.classList.add(`hidden`);
  }

  slimeBarSetup() {
    this.slimeScore = 0;
    this.slimeBar = this.add.sprite(this.game.width - 20, 70, `slimeLevel`);
    this.add.image(400, 32, `mask`);
    this.slimeBar.width = 104;
    this.slimeBar.height = 28;
    this.slimeBar.anchor.setTo(1, 0.5);
    this.cropRect = new Phaser.Rectangle(0, 0, 104, 28);
    this.slimeBar.crop(this.cropRect);
    this.time.events.loop(1000, this.slimeHandler, this);
  }

  slimeHandler() {

    if (rocketActive === false) {
      this.slimeScore += 5;
    }
    this.slimeBarHeight = 100 - this.slimeScore;
    if (this.slimeBarHeight > 0) {
      this.slimeBar.width = this.slimeBarHeight;
    } else {
      this.gameOver();
    }
  }

  powerUpSetup() {
    this.slimeGroup = new SlimeGroupPowerUp(this);
    this.obstacles = new ObstacleGroup(this);
    this.shieldGroup = new ShieldPowerUp(this);
    this.rocketGroup = new RocketPowerUp(this);
    this.lifeGroup = new LifePowerUp(this);
    this.gravityGroup = new GravityIncreaseObstacle(this);
    this.time.events.loop(2000, this.powerUpHandler, this);
  }

  powerUpHandler() {
    const powerUpArray = [];

    const obstacle = this.obstacles.getFirstExists(false);
    powerUpArray.push(obstacle);

    const obstacle1 = this.obstacles.getFirstExists(false);
    powerUpArray.push(obstacle1);

    const obstacle3 = this.obstacles.getFirstExists(false);
    powerUpArray.push(obstacle3);

    const gravity = this.gravityGroup.getFirstExists(false);
    powerUpArray.push(gravity);

    const slime = this.slimeGroup.getFirstExists(false);
    powerUpArray.push(slime);

    const slime1 = this.slimeGroup.getFirstExists(false);
    powerUpArray.push(slime1);

    if (shieldActive === false && rocketActive === false) {
      const shield = this.shieldGroup.getFirstExists(false);
      powerUpArray.push(shield);
    }
    if (rocketActive === false && shieldActive === false) {
      const rocket = this.rocketGroup.getFirstExists(false);
      powerUpArray.push(rocket);
    }

    if (this.snail.health < 3) {
      const life = this.lifeGroup.getFirstExists(false);
      powerUpArray.push(life);
    }

    this.placePowerUp(powerUpArray);
  }

  placePowerUp(array) {
    const platformX = this.rnd.integerInRange(1, 3) * PLATFORMSPACING;
    const powerUpX = platformX - (50 * this.rnd.integerInRange(0, 1));
    const powerUp = array[this.rnd.integerInRange(0, array.length - 1)];

    powerUp.reset(powerUpX - 10, - 10);
    powerUp.body.velocity.y = SPEED;

  }

  timePlayed() {
    time ++;
    return time;
  }

  createBackground() {
    this.stage.backgroundColor = `#87CEEB`;
    this.cloudGroup = new CloudGroup(this.game);
    this.satteliteGroup = new SatteliteGroup(this.game);
    this.starGroup = new StarGroup(this.game);
    this.planetGroup = new PlanetGroup(this.game);
  }

  backgroundSpawn() {
    if (this.score < 300) {
      this.cloudGroup.cloudSpawn();
    }
    if (this.score > 300 && this.score < 600) {
      this.satteliteGroup.satteliteSpawn();
      this.stage.backgroundColor = `#0a0a3c`;
    }
    if (this.score > 600 && this.score < 1000) {
      this.starGroup.starSpawn();
      this.stage.backgroundColor = `#000000`;
    }
    if (this.score > 1000) {
      this.planetGroup.planetSpawn();
    }
  }

  addMusic() {
    this.slime = this.add.audio(`slime`);
    this.slime.play();
    this.slime.loopFull();
    this.slime.volume = 0.2;
  }

  createPhysics() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = GRAVITYSTRENGTH;
  }

  createLifes() {
    this.lifes = this.add.group();
    this.lifes.add(this.add.sprite(0, 0, `lives`, `heart.png`));
    this.lifes.add(this.add.sprite(35, 0, `lives`, `heart.png`));
    this.lifes.add(this.add.sprite(70, 0, `lives`, `heart.png`));
    this.lifes.x = 20;
    this.lifes.y = 10;
  }

  createSnail() {
    this.snail = new Snail(this.game, STARTINGPOSITIONX, this.world.centerY);
    this.add.existing(this.snail);
    this.snail.health = 3;
  }

  createShield() {
    this.playerShield = this.add.sprite(this.snail.x, this.snail.y, `playerShield`);
    this.playerShield.anchor.setTo(0.5, 0.5);
    this.playerShield.scale.setTo(0.5, 0.5);
    this.playerShield.animations.add(`move`);
    this.playerShield.animations.play(`move`, 12, true);
  }

  // createGravity() {
  //   this.gravityPull = this.add.sprite(this.snail.x, this.snail.y, `gravityPull`);
  //   this.gravityPull.anchor.setTo(0.5, 0.5);
  //   this.gravityPull.scale.setTo(0.5, 0.5);
  //   this.gravityPull.animations.add(`pull`);
  //   this.gravityPull.animations.play(`pull`, 12, true);
  // }

  createInitPlatforms() {
    //eerste platformen die in beeld zijn wanneer de game begint
    this.platforms = new PlatformGroup(this.game);
    const platform = this.platforms.getFirstExists(false);
    platform.reset(75, 900);
    platform.height = 1000;
    platform.body.velocity.y = 200;
  }

  createRocket() {
    this.rocket = this.add.sprite(this.snail.x, this.snail.y, `rocket`);
    this.rocket.anchor.setTo(0.5, 0.5);
  }

  createPlatform() {
    this.platforms.createPlatform(PLATFORMSPACING);
  }

  startGeneratingPlatforms() {
    this.platformSpeed = 200;
    this.time.events.loop(5000, this.platformSpeedHigher, this);
    this.time.events.loop(Phaser.Timer.SECOND / 2, this.createPlatform, this);
  }

  createTopBar() {
    // doorzichtige balk bovenaan het scherm waar de scoren en de levens worden weergegeven
    const graphics = this.game.add.graphics(100, 100);
    graphics.beginFill(0xFFFFFFFF, 0.6);
    graphics.drawRect(- 100, - 100, 350, 45);
    graphics.endFill();
    this.createScoreText();

    this.shieldActiveShow = this.add.sprite(210, 3, `shield`);
    this.shieldActiveShow.scale.setTo(0.15, 0.15);
  }

  createScoreText() {
    this.scoreText = this.add.text(this.world.centerX, 25, this.score, {
      font: `30px Aller`,
      fill: `#000`,
      align: `center`
    });

    this.scoreText.anchor.setTo(0.5, 0.5);
  }

  updateScore() {
    //zowel de score als de speed gaan hier omhoog
    this .score ++;
    SPEED += SPEEDINCREASE;
    this.scoreText.setText(this.score);
  }

  startGeneratingScore() {
    this.scoreGenerator = this.time.events.loop(Phaser.Timer.SECOND / 10, this.updateScore, this);
  }

  createPauseButton() {
    this.pauseButton = this.add.text(300, 25, `Pause`, {
      font: `20px Aller`,
      fill: `#000`,
      align: `center`
    });
    this.pauseButton.anchor.setTo(0.5, 0.5);
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputUp.add(this.pauseButtonPressed, this);
    this.game.input.onDown.add(this.unpause, this);
    this.game.onPause.add(this.showPausedState, this);
    this.game.onResume.add(this.showPausedState, this);
  }

  showPausedState() {
    if (this.game.paused) {
      this.pauseButton.setText(`Resume`);
    } else {
      this.pauseButton.setText(`Pause`);
    }
  }

  unpause() {
    if (this.game.paused) {
      this.game.paused = false;
    }
  }

  pauseButtonPressed() {
    this.game.paused = !this.game.paused;
  }

  platformSpeedHigher() {
    this.platformSpeed += 10;
  }

  update() {
    this.backgroundSpawn();
    this.collisionDetection();
    this.gravitySwitch();
    this.keyboardInput();
    this.crossWorldBorder();

    if (this.snail.y > this.game.height || this.snail.y < - 20) {
      this.snail.damage(this.snail.health);
      this.showLifes();
      this.time.events.add(0, this.gameOver, this);
    }

    this.platforms.forEachAlive(platform => {
      platform.body.velocity.y = this.platformSpeed;
    });


    if (shieldActive === true) {
      this.shieldActiveShow.alpha = 1;
      this.playerShield.visible = true;
      this.playerShield.x = this.snail.x;
      this.playerShield.y = this.snail.y + 10;
    } else if (this.shieldActiveShow.alpha === 1 && shieldActive === false) {
      this.shieldActiveShow.alpha = 0;
    } else if (this.playerShield.alpha === 1 && shieldActive === false) {
      this.playerShield.visible = false;
    }


    if (rocketActive === true) {
      this.rocket.visible = true;
      this.rocket.x = this.snail.x;
      this.rocket.y = this.snail.y;
    } else if (rocketActive === false) {
      this.rocket.visible = false;
    }

    if (gravityActive === true) {
      // this.gravityPull.visible = true;
      // this.gravityPull.x = this.snail.x - 20;
      // this.gravityPull.y = this.snail.y;
    } else if (gravityActive === false) {
      // this.gravityPull.visible = false;
    }
  }

  collisionDetection() {
    // BAD POWER UPS
    if (shieldActive === false) {
      this.physics.arcade.overlap(this.snail, this.obstacles, this.obstacleHit, null, this);
    }

    // GOOD POWER UPS
    this.physics.arcade.overlap(this.snail, this.topBar);

    if (rocketActive === false) {
      this.physics.arcade.collide(this.snail, this.platforms);
    }
    this.physics.arcade.overlap(this.snail, this.lifeGroup, this.tookLife, null, this);
    this.physics.arcade.overlap(this.snail, this.shieldGroup, this.tookShield, null, this);
    this.physics.arcade.overlap(this.snail, this.slimeGroup, this.tookSlime, null, this);
    this.physics.arcade.overlap(this.snail, this.rocketGroup, this.tookRocket, null, this);

    this.physics.arcade.overlap(this.snail, this.gravityGroup, this.tookGravity, null, this);
  }

  tookSlime(snail, slime) {
    usedSlimeRefills += 1;
    this.slimeScore = 0;
    slime.kill();
  }

  tookShield(snail, shield) {
    usedShields += 1;
    shieldActive = true;
    shield.kill();

    this.time.events.add(5000, this.setShieldNotActive, this);
  }

  setShieldNotActive() {
    shieldActive = false;
  }

  tookLife(snail, life) {
    extraLifes += 1;
    life.kill();
    if (snail.health < 3) {
      snail.health += 1;
    } else {
      return;
    }
    this.showLifes();
  }

  tookRocket(snail, rocket) {
    rocketsTaken += 1;
    rocketActive = true;
    rocket.kill();
    this.physics.arcade.gravity.y = 0;
    this.time.events.add(5000, this.setRocketNotActive, this);
    if (rocketActive === true) {
      this.physics.arcade.overlap(this.snail, this.platforms, null, this);
    }
  }

  setRocketNotActive() {
    rocketActive = false;
    this.physics.arcade.gravity.y = GRAVITYSTRENGTH;
  }

  tookGravity(snail, gravity) {
    //gravitysTaken += 1;
    gravityActive = true;
    gravity.kill();
    this.physics.arcade.gravity.y = 2000;
    this.time.events.add(5000, this.setRocketNotActive, this);
  }

  setGravityNotActive() {
    gravityActive = false;
    this.physics.arcade.gravity.y = GRAVITYSTRENGTH;
  }

  gravitySwitch() {
    //wanneer de slak aan een tak hangt staat de zwaartekracht uit
    if (this.snail.body.touching.left || this.snail.body.touching.right) {
      this.snail.body.allowGravity = false;
    }
  }
  keyboardInput() {
    //slak heeft enkel controls zolang hij aan de tak hangt
    // zodra hij springt heeft hij geen controls meer
    if (rocketActive === true) {
      this.snail.body.velocity.y = 0;

      if (this.cursors.left.isDown) {
        this.snail.body.velocity.x = - XSPEED;
        this.snail.scale.x = - 1;
      }
      if (this.cursors.right.isDown) {
        this.snail.body.velocity.x = + XSPEED;
        this.snail.scale.x = 1;
      }
      if (this.cursors.down.isDown) {
        this.snail.body.velocity.y = + XSPEED;
      }
      if (this.cursors.up.isDown) {
        this.snail.body.velocity.y = - XSPEED;
      }
    }
    if (this.snail.body.allowGravity !== true) {

      if (this.cursors.left.isDown) {
        this.snail.body.allowGravity = true;
        this.snail.body.velocity.x = - XSPEED;
        this.snail.scale.x = - 1;
      }

      if (this.cursors.right.isDown) {
        this.snail.body.allowGravity = true;
        this.snail.body.velocity.x = + XSPEED;
        this.snail.scale.x = 1;
      }

      // if (this.snail.body.touching.right || this.snail.body.touching.left) {
      //   if (this.snail.scale.x === 1) {
      //     this.snail.body.velocity.x = XSPEED;
      //   } else {
      //     this.snail.body.velocity.x = - XSPEED;
      //   }
      // }

      if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (this.snail.scale.x === 1) {
          this.snail.body.allowGravity = true;
          this.snail.body.velocity.x = - XSPEED;
          this.snail.scale.x = - 1;
        } else if (this.snail.scale.x === - 1) {
          this.snail.body.velocity.x = + XSPEED;
          this.snail.body.allowGravity = true;
          this.snail.scale.x = 1;
        }
      }

      this.snail.body.velocity.y = 0;
      if (this.cursors.up.isDown) {
        this.snail.body.velocity.y = - YSPEED;
      }
      if (this.cursors.down.isDown) {
        this.snail.body.velocity.y = + YSPEED;
      }
    }
  }

  crossWorldBorder() {
    if (this.snail.x < 0) {
      this.snail.x = this.world.width;
    }
    else if (this.snail.x > this.world.width) {
      this.snail.x = 0;
    }
  }

  obstacleHit(snail, obstacle) {
    hitsTaken += 1;
    obstacle.kill();
    this.snail.health -= 1;
    this.showLifes();
    if (this.snail.health <= 0) {
      this.gameOver();
    }
  }

  showLifes() {
    let index = 0;
    this.lifes.forEach(life => {
      if (index < this.snail.health) {
        life.frameName = `heart.png`;
      } else {
        life.frameName = `empty_heart.png`;
      }
      index ++;
    });
  }

  gameOver() {
    const $scoreInput = document.querySelector(`.scoreInput`);
    $scoreInput.value = this.score;

    const $time = document.querySelector(`.timePlayed`);
    $time.value = time;

    const $shieldsUsed = document.getElementById(`usedShields`);
    $shieldsUsed.value = usedShields;

    const $usedSlimeRefills = document.getElementById(`usedSlimeRefills`);
    $usedSlimeRefills.value = usedSlimeRefills;

    const $extraLifes = document.getElementById(`extraLifes`);
    $extraLifes.value = extraLifes;

    const $hitsTaken = document.getElementById(`hitsTaken`);
    $hitsTaken.value = hitsTaken;

    const $usedRockets = document.getElementById(`usedRockets`);
    $usedRockets.value = rocketsTaken;

    if (shieldActive === true) {
      shieldActive = false;
    }

    this.state.start(`GameOver`);
  }

  render() {
    //this.game.debug.body(this.snail);
  }



}
