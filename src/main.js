const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    scene: {
        preload, create, update
    },
    antialias: false,
};

const game = new Phaser.Game(config);
let gameState = {
    hasIntroduced: false,
}


function preload() {
    this.load.spritesheet('backgroundSprite', 'assets/sprites/background.png', {
        frameWidth: 200,
        frameHeight: 100,
    });

    this.load.spritesheet('dogSprite', 'assets/sprites/dog.png', {
        frameWidth: 1600,
        frameHeight: 800,
    });
    this.load.spritesheet('clydeSprite', 'assets/sprites/CLYDE.png', {
        frameWidth: 1600,
        frameHeight: 800,
    });
    this.load.spritesheet('casaSprite', 'assets/sprites/drcasa.png', {
        frameWidth: 1600,
        frameHeight: 800,
    });
    this.load.spritesheet('ajSprite', 'assets/sprites/aj-sampson.png', {
        frameWidth: 1600,
        frameHeight: 800,
    });

    this.load.image('scroll', 'assets/sprites/scroll.png');
    this.load.audio('clydeIntro', 'assets/audio/Clyde-Intro.mp3');
    this.load.audio('casaIntro', 'assets/audio/Casa-Intro.mp3');
    this.load.audio('ajIntro', 'assets/audio/AJ-Intro.mp3');
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
    this.anims.create({
        key: 'dog',
        frames: this.anims.generateFrameNumbers('dogSprite', {
            start: 0,
            end: 1
        }),
        frameRate: 3,
        repeat: -1,
    })
    this.anims.create({
        key: 'clyde',
        frames: this.anims.generateFrameNumbers('clydeSprite', {
            start: 0,
            end: 1
        }),
        frameRate: 5,
        repeat: -1,
    })
    this.anims.create({
        key: 'casa',
        frames: this.anims.generateFrameNumbers('casaSprite', {
            start: 0,
            end: 1
        }),
        frameRate: 3,
        repeat: -1,
    })
    this.anims.create({
        key: 'aj',
        frames: this.anims.generateFrameNumbers('ajSprite', {
            start: 0,
            end: 1
        }),
        frameRate: 3,
        repeat: -1,
    })

    this.add.sprite(config.width / 2, config.height / 2, 'backgroundSprite').setScale(8).play('background');
    this.add.sprite(config.width / 2, config.height / 2, 'dogSprite').play('dog');
    this.add.sprite(config.width / 2, config.height / 2, 'clydeSprite').play('clyde');
    this.add.sprite(config.width / 2, config.height / 2, 'casaSprite').play('casa');
    this.add.sprite(config.width / 2, config.height / 2, 'ajSprite').play('aj');
    const scroll1 = this.add.image(.75 * config.width / 2, 3 * config.height / 4, 'scroll').setScale(1.5);
    const scroll2 = this.add.image(config.width / 2, 3 * config.height / 4, 'scroll').setScale(1.5);
    const scroll3 = this.add.image(1.25 * config.width / 2, 3 * config.height / 4, 'scroll').setScale(1.5);

    const clydeIntro = this.sound.add('clydeIntro');
    const casaIntro = this.sound.add('casaIntro');
    const ajIntro = this.sound.add('ajIntro');

    this.input.keyboard.on('keydown', (event) => {
        if (!gameState.hasIntroduced) {
            introduceCharacters([clydeIntro, casaIntro, ajIntro]);
            gameState.hasIntroduced = true;
        }
    });
}

function update() {
}

function introduceCharacters(audios) {
    if (audios.length == 0) {
        return;
    }

    audios[0].play();
    for (let i = 0; i < audios.length-1; i++) {
        audios[i].on('complete', () => {
            audios[i+1].play();
        });
    }
}