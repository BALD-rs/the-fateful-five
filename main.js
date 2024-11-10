var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    antialias: false,
};

var game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('backgroundSprite', 'assets/sprites/background.png', {
        frameWidth: 200,
        frameHeight: 100,
    });
}

function create() {
    this.anims.create({
        key: 'background',
        frames: this.anims.generateFrameNumbers('backgroundSprite', {
            start: 0,
            end: 6
        }),
        frameRate: 10,
        repeat: -1,
    })
    const background = this.add.sprite(config.width/2, config.height/2, 'backgroundSprite').setScale(8).play('background');
}

function update() {
}
