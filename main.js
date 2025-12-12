var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#f22",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

var player;
var cursors;

function preload() {
    this.load.spritesheet('player', 'sprites/plrSheet.png', {
        frameWidth: 2880 / 12, // 12 frames horizontally
        frameHeight: 320     // height of one frame
    });
}

function create() {
    player = this.physics.add.sprite(400, 300, 'player', 0);
    player.setCollideWorldBounds(true);

    player.setScale(0.5);

    cursors = this.input.keyboard.createCursorKeys();

    const walkLeftFrames = [11, 9, 10, 9];
    const walkRightFrames = [5, 3, 4, 3];
    const walkDownFrames = [2, 0, 1, 0]

    this.anims.create({
        key: 'walkLeft',
        frames: this.anims.generateFrameNumbers('player', { frames: walkLeftFrames }),//start: 9, end: 11
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkRight',
        frames: this.anims.generateFrameNumbers('player', { frames: walkRightFrames }),// start: 3, end: 5 
        frameRate: 8,
        repeat: -1
    });
    // up
    this.anims.create({
        key: 'walkDown',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 0, 1, 0] }), //start: 0, end: 2
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp',
        frames: this.anims.generateFrameNumbers('player', {frames: [8, 6, 7, 6]}),//start: 6, end: 8 
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {frames: [0]}),
        frameRate: 8,
        repeat: -1
    });
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play('walkLeft', true);
    } 
    if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play('walkRight', true);
    } 
    if (cursors.up.isDown) {
        player.setVelocityY(-200);
        player.anims.play('walkUp', true);
    } 
    if (cursors.down.isDown) {
        player.setVelocityY(200);
        player.anims.play('walkDown', true);
    }

    if (
        !cursors.left.isDown &&
        !cursors.right.isDown &&
        !cursors.up.isDown &&
        !cursors.down.isDown
    ) {
        player.anims.play('idle', true);
    }
}
