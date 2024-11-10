const policies = [
    {
        "text": "Mandatory McAfee Antivirus",
        "revolt_delta": -5,
        "money_delta": 5
    },
    {
        "text": "2000% tax on the serfs",
        "revolt_delta": -50,
        "money_delta": 100
    },
    {
        "text": "Free discord nitro for all citizens",
        "revolt_delta": 30,
        "money_delta": -15
    },
    {
        "text": "Send nuke to mars",
        "revolt_delta": 7,
        "money_delta": -25
    },
    {
        "text": "Ban on pitchforks and torches",
        "revolt_delta": -25,
        "money_delta": 0
    },
    {
        "text": "left handers sent to gulag",
        "revolt_delta": -10,
        "money_delta": -5
    },
    {
        "text": "sdrawkcab sgniht etirw ot troffe lanoitaN",
        "revolt_delta": -3,
        "money_delta": -5
    },
    {
        "text": "Institutionalized discrimination of blue people",
        "revolt_delta": -50,
        "money_delta": -30
    },
    {
        "text": "underground lizard people banned",
        "revolt_delta": 10,
        "money_delta": -5
    },
    {
        "text": "Literally create the hunger games",
        "revolt_delta": -50,
        "money_delta": 40
    },
    {
        "text": "Forced trainsphobia (hatred of trains)",
        "revolt_delta": -20,
        "money_delta": -40
    },
    {
        "text": "Unnecessarily large chicken nugget",
        "revolt_delta": 10,
        "money_delta": -10
    },
    {
        "text": "kids in the mines",
        "revolt_delta": -20,
        "money_delta": 70
    },
    {
        "text": "Forced veganism",
        "revolt_delta": -15,
        "money_delta": 10
    },
    {
        "text": "money burn pits",
        "revolt_delta": -5,
        "money_delta": -40
    },
    {
        "text": "fish cloning experiments",
        "revolt_delta": 10,
        "money_delta": 30
    },
    {
        "text": "build more costcos",
        "revolt_delta": 30,
        "money_delta": -20
    },
    {
        "text": "divide by 0",
        "revolt_delta": -1000,
        "money_delta": -1000
    }
]

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    scene: {
        preload, create, update
    },
    antialias: false,
};

const SHUFFLE_POLICIES = true;
const defaultPolicy = {
    "text": "Kill everyone",
    "revolt_delta": -100,
    "money_delta": 100
};
let selectedPolicy = null;

const game = new Phaser.Game(config);
let textboxSprite = null;
let textboxTitle = null;
let textboxDescription = null;
const scrolls = [null, null, null];

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
        currentPolicies: [],
        currentChancellor: null,
    }
    console.log('SELECTION PHASE');

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
    this.textboxSprite = null;

    this.input.keyboard.on('keydown-ONE', () => {
        handleKeyPress(this, 1);
    });
    this.input.keyboard.on('keydown-TWO', () => {
        handleKeyPress(this, 2);
    });
    this.input.keyboard.on('keydown-THREE', () => {
        handleKeyPress(this, 3);
    });
    this.input.keyboard.on('keydown-FOUR', () => {
        handleKeyPress(this, 4);
    });

    const clydeIntro = this.sound.add('clydeIntro');
    const casaIntro = this.sound.add('casaIntro');
    const ajIntro = this.sound.add('ajIntro');

    this.input.keyboard.on('keydown', (event) => {
        if (!this.state.hasIntroduced) {
            this.state.hasIntroduced = true;
            // introduceCharacters(this, [['Clyde', clydeIntro, lines.clydeIntro], ['Dr. Casa', casaIntro, lines.casaIntro], ['AJ Sampson', ajIntro, lines.ajIntro]]);
            introduceCharacters(this, []);
        }
    });

    if (SHUFFLE_POLICIES) {
        shuffleArray(policies);
    }
}

function update() {
    if (this.state.playing) {
        if (!scrolls[0] && !scroll[1] && !scroll[2]) {
            generatePolicies(this);
        }
    }
}

function generatePolicies(scene) {
    for (let i = 0; i < 3; i++) {
        const policy = policies.length > 0 ? policies.pop() : defaultPolicy;
        scene.state.currentPolicies.push(policy);
    }
    scrolls[0] = scene.add.image(.75 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
    scrolls[1] = scene.add.image(config.width / 2, .65 * config.height, 'scroll').setScale(1);
    scrolls[2] = scene.add.image(1.25 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
}

function introduceCharacters(scene, dialogue) {
    if (dialogue.length == 0) {
        setTimeout(() => {
            scene.state.playing = true;
        }, 1000);
        return;
    }

    dialogue[0][1].play();
    showTextbox(scene, dialogue[0][0], dialogue[0][2]);
    for (let i = 0; i < dialogue.length - 1; i++) {
        dialogue[i][1].on('complete', () => {
            dialogue[i + 1][1].play();
            hideTextbox(scene);
            showTextbox(scene, dialogue[i + 1][0], dialogue[i + 1][2]);
        });
    }
    dialogue[dialogue.length - 1][1].on('complete', () => {
        hideTextbox(scene);
        setTimeout(() => {
            scene.state.playing = true;
            updateChancellor(scene, 0);
        }, 1000);
    });
}

function showTextbox(scene, title, text) {
    textboxSprite = scene.add.sprite(config.width / 2, 5 * config.height / 6, 'textbox').setScale(1.5);
    textboxSprite.setDepth(10);

    textboxTitle = scene.add.text(config.width / 2 - 250, 5 * config.height / 6 - 60, '', {
        fontSize: '28px',
        color: '#000000',
        wordWrap: { width: 500 }
    });
    textboxTitle.setScrollFactor(0);
    textboxTitle.setDepth(11);
    textboxTitle.setText(title);
    textboxDescription = scene.add.text(config.width / 2 - 250, 5 * config.height / 6 - 15, '', {
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

// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function handleKeyPress(scene, key) {
    if (scene.state.playing) {
        if (scene.state.phase === 'selection') {
            if (scene.state.currentPolicies.length !== 3) {
                console.log('something has perchance gone wrong');
                return;
            }
            // selecting between policies
            if ([1,2,3].includes(selectedPolicy) && key === 4) {
                hideTextbox(scene);
                removePolicy(scene, selectedPolicy);
            } else if (selectedPolicy === null && key !== 4) {
                // set the selected policy
                selectedPolicy = key;
                hideTextbox(scene);
                const policy = scene.state.currentPolicies[selectedPolicy - 1];
                const revolt = -policy.revolt_delta; // invert this cuz of how we're showing the bars in-game
                const money = policy.money_delta;
                const policyDescription = `Description: ${policy.text}\nRevolt ${revolt >= 0 ? 'INCREASES' : 'DECREASES'} by ${revolt}\nBudget ${money >= 0 ? 'INCREASES' : 'DECREASES'} by ${money}`;
                showTextbox(scene, `Policy ${key}`, policyDescription);
            } else {
                hideTextbox(scene);
                selectedPolicy = null;
            }
        }
    }
}

function removePolicy(scene, selectedPolicy) {
    console.log(`rejecting policy ${selectedPolicy-1}`);
    scrolls[selectedPolicy-1].destroy();
    scene.state.currentPolicies.splice(selectedPolicy - 1, 1);
    setTimeout(() => {
        scene.state.phase = 'chancellor';
        console.log('CHANCELLOR PHASE');
    }, 1000);
}

function updateChancellor(scene, newChancellor) {
    scene.state.chancellor = newChancellor;
}