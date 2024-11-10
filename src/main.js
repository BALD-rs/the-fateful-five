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
const SKIP_INTRO = true;
const defaultPolicy = {
    "text": "Kill everyone",
    "revolt_delta": -100,
    "money_delta": 100
};
let selectedPolicy = null;

const game = new Phaser.Game(config);
const evil = Math.floor(Math.random() * 4);
let textboxSprite = null;
let textboxTitle = null;
let textboxDescription = null;
let chancellorSprite = null;
const scrolls = [null, null, null];
const sounds = {};
const eliminated = [];

const characters = [
    'dog',
    'clyde',
    'casa',
    'aj',
]
const characterTitles = [
    'Teddy K.',
    'Clyde',
    'Dr. Casa',
    'AJ Sampson',
]
const lines = {
    dogIntro: "What up it's Teddy K. I think the industrial revolution is overrated.",
    clydeIntro: 'In the jungle they called me Clyde. You can too.',
    casaIntro: "I'm Casa. You can relax. I'm not here to make friends.",
    ajIntro: "Name's AJ Sampson. Let's see if I can bring a little of that old charm to the table.",
    dogChancellor: "IT'S CHANCELLIN TIME !!!",
    clydeChancellor: "IT'S CHANCELLIN TIME !!!",
    casaChancellor: "IT'S CHANCELLIN TIME !!!",
    ajChancellor: "IT'S CHANCELLIN TIME !!!",
    dogDiscardPolicy: "this policy is trash lil bro",
    clydeDiscardPolicy: "this policy is trash lil bro",
    casaDiscardPolicy: "this policy is trash lil bro",
    ajDiscardPolicy: "this policy is trash lil bro",
}
const chancellorPositions = [
    [260, config.height / 6],
    [780, config.height / 9],
    [1220, config.height / 8],
    [config.width - 350, config.height / 5],
]

function preload() {
    this.state = {
        hasIntroduced: false,
        playing: false,
        phase: 'selection',
        currentPolicies: [],
        currentChancellor: null,
    }
    console.log(`EVIL CHARACTER IS: ${characterTitles[evil]}`);
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
    this.load.image('chancellor', 'assets/sprites/chancellor.png');

    this.load.audio('dogIntro', 'assets/audio/Dog-Intro.mp3');
    this.load.audio('clydeIntro', 'assets/audio/Clyde-Intro.mp3');
    this.load.audio('casaIntro', 'assets/audio/Casa-Intro.mp3');
    this.load.audio('ajIntro', 'assets/audio/AJ-Intro.mp3');
    this.load.audio('dogChancellor', 'assets/audio/Dog-Chancellor.mp3');
    this.load.audio('clydeChancellor', 'assets/audio/Clyde-Chancellor.mp3');
    this.load.audio('casaChancellor', 'assets/audio/Casa-Chancellor.mp3');
    this.load.audio('ajChancellor', 'assets/audio/AJ-Chancellor.mp3');
    this.load.audio('dogDiscardPolicy', 'assets/audio/Dog-Discard-Policy.mp3');
    this.load.audio('clydeDiscardPolicy', 'assets/audio/Clyde-Discard-Policy.mp3');
    this.load.audio('casaDiscardPolicy', 'assets/audio/Casa-Discard-Policy.mp3');
    this.load.audio('ajDiscardPolicy', 'assets/audio/AJ-Discard-Policy.mp3');
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
    chancellorSprite = this.add.image(3000, 3000, 'chancellor').setScale(1.7);

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

    sounds.dogIntro = this.sound.add('dogIntro');
    sounds.clydeIntro = this.sound.add('clydeIntro');
    sounds.casaIntro = this.sound.add('casaIntro');
    sounds.ajIntro = this.sound.add('ajIntro');
    sounds.dogChancellor = this.sound.add('dogChancellor');
    sounds.clydeChancellor = this.sound.add('clydeChancellor');
    sounds.casaChancellor = this.sound.add('casaChancellor');
    sounds.ajChancellor = this.sound.add('ajChancellor');
    sounds.dogDiscardPolicy = this.sound.add('dogDiscardPolicy');
    sounds.clydeDiscardPolicy = this.sound.add('clydeDiscardPolicy');
    sounds.casaDiscardPolicy = this.sound.add('casaDiscardPolicy');
    sounds.ajDiscardPolicy = this.sound.add('ajDiscardPolicy');

    this.input.keyboard.on('keydown', (event) => {
        if (!this.state.hasIntroduced) {
            this.state.hasIntroduced = true;
            if (SKIP_INTRO) {
                introduceCharacters(this, []);
            } else {
                introduceCharacters(this, [['Teddy K.', sounds.dogIntro, lines.dogIntro], ['Clyde', sounds.clydeIntro, lines.clydeIntro], ['Dr. Casa', sounds.casaIntro, lines.casaIntro], ['AJ Sampson', sounds.ajIntro, lines.ajIntro]]);
            }
        }
    });

    if (SHUFFLE_POLICIES) {
        shuffleArray(policies);
    }
}

function update() {
    if (this.state.playing) {
        if (this.state.phase === 'selection' && scrolls.length === 3 && !scrolls[0] && !scroll[1] && !scroll[2]) {
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
            updateChancellor(scene, 0);
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
                // submit the selected policy
                hideTextbox(scene);
                removePolicy(scene, selectedPolicy);
            } else if (key !== 4) {
                // set the selected policy
                selectedPolicy = key;
                hideTextbox(scene);
                const policy = scene.state.currentPolicies[selectedPolicy - 1];
                const revolt = policy.revolt_delta; // invert this cuz of how we're showing the bars in-game
                const money = policy.money_delta;
                const policyDescription = `Description: ${policy.text}\nApproval ${revolt >= 0 ? 'INCREASES' : 'DECREASES'} by ${revolt}\nBudget ${money >= 0 ? 'INCREASES' : 'DECREASES'} by ${money}`;
                showTextbox(scene, `Policy ${key}`, policyDescription);
            } else {
                // "debouncing is hard" -dawson 12:39am
                // hideTextbox(scene);
                // selectedPolicy = null;
            }
        }
    }
}

function removePolicy(scene, selectedPolicy) {
    console.log(`rejecting policy ${selectedPolicy-1}`);
    scrolls[selectedPolicy-1].destroy();
    scrolls.splice(selectedPolicy - 1, 1);
    scene.state.currentPolicies.splice(selectedPolicy - 1, 1);
    setTimeout(() => {
        scene.state.phase = 'chancellor';
        console.log('CHANCELLOR PHASE');
        chancellorChoose(scene);
    }, 1000);
}

function updateChancellor(scene, newChancellor) {
    if (newChancellor < 0 || newChancellor > 3) {
        console.error('invalid new chancellor');
        return;
    }
    scene.state.currentChancellor = newChancellor;
    if (chancellorSprite) {
        const [newX, newY] = chancellorPositions[newChancellor];
        chancellorSprite.setPosition(newX, newY);
    }
    const chancellorString = `${characters[newChancellor]}Chancellor`;
    const chancellorAnnouncement = sounds[chancellorString];
    if (!chancellorAnnouncement || !lines[chancellorString]) {
        console.error('something terrible has happened');
        return;
    }
    showTextbox(scene, characterTitles[newChancellor], lines[chancellorString]);
    chancellorAnnouncement.play();
    chancellorAnnouncement.on('complete', () => {
        hideTextbox(scene);
    });
}

function chancellorChoose(scene) {
    const chancellor = scene.state.currentChancellor;
    const discardString = `${characters[chancellor]}DiscardPolicy`;
    const discardAnnouncement = sounds[discardString];
    if (!discardAnnouncement || !lines[discardString]) {
        console.error('something terrible has happened pt. 2');
        return;
    }
    const currentPolicies = scene.state.currentPolicies;
    if (currentPolicies.length !== 2) {
        console.error('something has perchance gone VERY WRONG');
        return;
    }

    // positive deltas are always better
    const sum1 = currentPolicies[0].revolt_delta + currentPolicies[0].money_delta;
    const sum2 = currentPolicies[1].revolt_delta + currentPolicies[1].money_delta;
    const betterPolicy = sum1 > sum2 ? 0 : 1;
    const worsePolicy = betterPolicy === 0 ? 1 : 0;
    // if evil, discard the better policy, otherwise discard the worse policy
    const discarded = chancellor === evil ? betterPolicy : worsePolicy;
    showTextbox(scene, characterTitles[chancellor] + ' (Chancellor)', lines[discardString] + `\n(Discards the ${discarded === 0 ? 'left' : 'right'} policy)`);
    console.log('SCROLLS 1', scrolls);
    discardAnnouncement.play();
    discardAnnouncement.on('complete', () => {
        hideTextbox(scene);
        scrolls[discarded].destroy();
        currentPolicies.splice(discarded, 1);
        const enacted = currentPolicies[0];
        const revolt = enacted.revolt_delta;
        const money = enacted.money_delta;
        console.log('SCROLLS 2', scrolls);
        showTextbox(scene, 'POLICY ENACTED', `${enacted.text}\n${revolt >= 0 ? '+' : ''}${revolt} APPROVAL\n${money >= 0 ? '+' : ''}${money} MONEY`);
        setTimeout(() => {
            hideTextbox(scene);
            currentPolicies.length = 0;
            for (const scroll of scrolls) {
                if (scroll) scroll.destroy();
            }
            scrolls.length = 0;
            scrolls.push(null);
            scrolls.push(null);
            scrolls.push(null);
            if (scene.state.currentChancellor === 3) {
                startVote(scene);
            } else {
                scene.state.phase = 'selection';
                updateChancellor(scene, scene.state.currentChancellor + 1);
            }
        }, 3000);
    });
}

function startVote(scene) {
    const remaining = [];
    for (let i = 0; i < 4; i++) {
        if (!eliminated.includes(i)) {
            remaining.push(i);
        }
    }
    let text = '';
    for (const i of remaining) {
        text += `Press ${i+1} to eliminate ${characterTitles[i]}\n`;
    }
    showTextbox(scene, 'VOTE TO ELIMINATE', text);
    scene.state.phase = 'voting';
}