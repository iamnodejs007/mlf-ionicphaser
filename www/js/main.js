'use strict';
var game = new Phaser.Game(500, 300, Phaser.CANVAS, '', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', 'assets/ionicphaser.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('mario', 'assets/super_mario.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

  // centers game on x & y axis
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  // enables game to scale in browser
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.refresh();

}

var map, background, clouds, ground, dude, money;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //***************MAP************//
  map = game.add.tilemap('map');
  map.addTilesetImage('Mario', 'mario');
  background = map.createLayer('Background');
  clouds = map.createLayer('Clouds');
  ground = map.createLayer('Ground');
  background.resizeWorld();


  map.setCollision(40, true, 'Ground');

  //***************COIN************//
  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  map.createFromObjects('Money', 45, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

   //***************DUDE************//
  dude = game.add.sprite(0, 0, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  game.camera.follow(dude);
  dude.body.gravity.y = 300;
  dude.body.bounce.y = 0.3;
  dude.body.collideWorldBounds = true;
}

function update(){
  game.physics.arcade.collide(dude, ground);

  if(game.input.activePointer.isDown){
    if(game.input.activePointer.y < 150){
      dude.body.velocity.y = -350;
    }

    if(game.input.activePointer.x < 150){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }else{
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }
  }else{
    dude.body.velocity.x = 0;
    dude.animations.stop();
    dude.frame = 4;
  }
}
