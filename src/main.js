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
let textboxSprite = null;
let textboxTitle = null;
let textboxDescription = null;
let scroll1 = null;
let scroll2 = null;
let scroll3 = null;

const lines = {
    clydeIntro: 'In the jungle they called me Clyde. You can too.',
    casaIntro: "I'm Casa. You can relax. I'm not here to make friends.",
    ajIntro: "Name's AJ Sampson. Let's see if I can bring a little of that old charm to the table.",
}

function preload() {
    this.state = {
        hasIntroduced: false,
        playing: false,
        phase: 'selection',
    }

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
    this.load.image('textbox', 'assets/sprites/textbox.png');
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
    // scroll1 = this.add.image(.75 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
    // scroll2 = this.add.image(config.width / 2, .65 * config.height, 'scroll').setScale(1);
    // scroll3 = this.add.image(1.25 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
    this.textboxSprite = null;

    const clydeIntro = this.sound.add('clydeIntro');
    const casaIntro = this.sound.add('casaIntro');
    const ajIntro = this.sound.add('ajIntro');

    this.input.keyboard.on('keydown', (event) => {
        if (!this.state.hasIntroduced) {
            this.state.hasIntroduced = true;
            introduceCharacters(this, [['Clyde', clydeIntro, lines.clydeIntro], ['Dr. Casa', casaIntro, lines.casaIntro], ['AJ Sampson', ajIntro, lines.ajIntro]]);
        }
    });
}

function update() {
    if (this.state.playing) {
        if (!scroll1 && !scroll2 && !scroll3) {
            scroll1 = this.add.image(.75 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
            scroll2 = this.add.image(config.width / 2, .65 * config.height, 'scroll').setScale(1);
            scroll3 = this.add.image(1.25 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
        }
    }
}

function introduceCharacters(scene, dialogue) {
    if (dialogue.length == 0) {
        return;
    }

    dialogue[0][1].play();
    showTextbox(scene, dialogue[0][0], dialogue[0][2]);
    for (let i = 0; i < dialogue.length - 1; i++) {
        dialogue[i][1].on('complete', () => {
            dialogue[i + 1][1].play();
            hideTextbox(scene);
            showTextbox(scene, dialogue[i+1][0], dialogue[i+1][2]);
        });
    }
    dialogue[dialogue.length - 1][1].on('complete', () => {
        hideTextbox(scene);
        setTimeout(() => {
            scene.state.playing = true;
        }, 1000);
    });
}

function showTextbox(scene, title, text) {
    textboxSprite = scene.add.sprite(config.width / 2, 5 * config.height / 6, 'textbox').setScale(1.5);
    textboxSprite.setDepth(10);
    
    textboxTitle = scene.add.text(config.width / 2 - 250, 5 * config.height / 6 - 55, '', {
        fontSize: '28px',
        color: '#000000',
        wordWrap: { width: 500 }
    });
    textboxTitle.setScrollFactor(0);
    textboxTitle.setDepth(11);
    textboxTitle.setText(title);
    textboxDescription = scene.add.text(config.width / 2 - 250, 5 * config.height / 6 - 10, '', {
        fontSize: '18px',
        color: '#000000',
        wordWrap: { width: 500 }
    });
    textboxDescription.setScrollFactor(0);
    textboxDescription.setDepth(11);
    textboxDescription.setText(text);
}

function hideTextbox(scene) {
    if (textboxSprite) {
        textboxSprite.destroy();
        textboxSprite = null;
    }
    if (textboxTitle) {
        textboxTitle.destroy();
        textboxTitle = null;
    }
    if (textboxDescription) {
        textboxDescription.destroy();
        textboxDescription = null;
    }
}