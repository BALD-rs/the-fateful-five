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
let policyIdx = 0;
let selectedPolicy = null;

const game = new Phaser.Game(config);
let approval = 100;
let budget = 100;
let approvalTextSprite = null;
let budgetTextSprite = null;
const evil = Math.floor(Math.random() * 4);
let textboxSprite = null;
let textboxTitle = null;
let textboxDescription = null;
let chancellorSprite = null;
const scrolls = [null, null, null];
const sounds = {};
const sprites = {};
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
    dogIntro: "Borkedy bork bork bark (What up it's Teddy K. I think modern society is overrated.)",
    clydeIntro: 'In the jungle they called me Clyde. You can too.',
    casaIntro: "I'm Casa. You can relax. I'm not here to make friends.",
    ajIntro: "Name's AJ Sampson. Let's see if I can bring a little of that old charm to the table.",
    dogChancellor: "Bark borky bark (IT'S CHANCELLIN TIME)",
    clydeChancellor: "Look at me, I'm the chancellor now",
    casaChancellor: "Finally, I get to be chancellor",
    ajChancellor: "Get me off the bench because I'm Chancellor now!",
    dogDiscardPolicy: "Bork bark bark bork (I'm discarding this policy)",
    clydeDiscardPolicy: "That policy's dumber than my decision to go to 'nam",
    casaDiscardPolicy: "Clearly, whoever wrote this policy has lupus",
    ajDiscardPolicy: "If the policy isn't it, you must dismiss it. This card right out!",
    dogVotedOut: "Woof bork woof bork (i'm sad I got voted out)",
    clydeVotedOut: "So I'm voted out, huh? Guess it's not the first time I've been left behind",
    casaVotedOut: "You cretins who voted me out are why I don't talk to my patients",
    ajVotedOut: "Why are you voting me out? I thought I was acquitted!",
}
const chancellorPositions = [
    [260, config.height / 6],
    [780, config.height / 9],
    [1220, config.height / 8],
    [config.width - 350, config.height / 4],
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
    this.load.spritesheet('winSprite', 'assets/sprites/win.png', {
        frameWidth: 640,
        frameHeight: 360,
    });
    this.load.spritesheet('loseSprite', 'assets/sprites/lose.png', {
        frameWidth: 640,
        frameHeight: 360,
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
    this.load.audio('dogVotedOut', 'assets/audio/Dog-Voted-Out.mp3');
    this.load.audio('clydeVotedOut', 'assets/audio/Clyde-Voted-Out.mp3');
    this.load.audio('casaVotedOut', 'assets/audio/Casa-Voted-Out.mp3');
    this.load.audio('ajVotedOut', 'assets/audio/AJ-Voted-Out.mp3');
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
    this.anims.create({
        key: 'win',
        frames: this.anims.generateFrameNumbers('winSprite', {
            start: 0,
            end: 3
        }),
        frameRate: 3,
        repeat: -1,
    })
    this.anims.create({
        key: 'lose',
        frames: this.anims.generateFrameNumbers('loseSprite', {
            start: 0,
            end: 9
        }),
        frameRate: 3,
        repeat: -1,
    })

    this.add.sprite(config.width / 2, config.height / 2, 'backgroundSprite').setScale(8).play('background');
    sprites.dog = this.add.sprite(config.width / 2, config.height / 2, 'dogSprite').play('dog');
    sprites.clyde = this.add.sprite(config.width / 2, config.height / 2, 'clydeSprite').play('clyde');
    sprites.casa = this.add.sprite(config.width / 2, config.height / 2, 'casaSprite').play('casa');
    sprites.aj = this.add.sprite(config.width / 2, config.height / 2, 'ajSprite').play('aj');
    chancellorSprite = this.add.image(3000, 3000, 'chancellor').setScale(1.7);
    const infoboxSprite = this.add.sprite(1596, 80, 'textbox').setScale(1.3);
    infoboxSprite.displayWidth = .7 * infoboxSprite.width;
    approvalTextSprite = this.add.text(1500, 45, '', {
        fontSize: '24px',
        color: '#000000',
        wordWrap: { width: 300 }
    });
    approvalTextSprite.setScrollFactor(0);
    approvalTextSprite.setDepth(3);
    approvalTextSprite.setText('Approval: 100%');
    budgetTextSprite = this.add.text(1500, 95, '', {
        fontSize: '24px',
        color: '#000000',
        wordWrap: { width: 300 }
    });
    budgetTextSprite.setScrollFactor(0);
    budgetTextSprite.setDepth(3);
    budgetTextSprite.setText('Budget: $100');

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
    sounds.dogVotedOut = this.sound.add('dogVotedOut');
    sounds.clydeVotedOut = this.sound.add('clydeVotedOut');
    sounds.casaVotedOut = this.sound.add('casaVotedOut');
    sounds.ajVotedOut = this.sound.add('ajVotedOut');

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
    // if (this.state.playing) {
    //     if (this.state.phase === 'selection' && scrolls.length === 3 && !scrolls[0] && !scroll[1] && !scroll[2]) {
    //         generatePolicies(this);
    //     }
    // }
}

function generatePolicies(scene) {
    scene.state.currentPolicies.length = 0;
    scrolls.length = 0;
    for (let i = 0; i < 3; i++) {
        scene.state.currentPolicies.push(policies[policyIdx]);
        policyIdx = (policyIdx + 1) % policies.length;
        scrolls.push(null);
    }
    scrolls[0] = scene.add.image(.75 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
    scrolls[1] = scene.add.image(config.width / 2, .65 * config.height, 'scroll').setScale(1);
    scrolls[2] = scene.add.image(1.25 * config.width / 2, .65 * config.height, 'scroll').setScale(1);
}

function introduceCharacters(scene, dialogue) {
    if (dialogue.length == 0) {
        setTimeout(() => {
            scene.state.playing = true;
            generatePolicies(scene);
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
            generatePolicies(scene);
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
                const revolt = policy.revolt_delta;
                const money = policy.money_delta;
                const policyDescription = `Description: ${policy.text}\nApproval ${revolt >= 0 ? 'INCREASES' : 'DECREASES'} by ${revolt}\nBudget ${money >= 0 ? 'INCREASES' : 'DECREASES'} by ${money}`;
                showTextbox(scene, `Policy ${key}`, policyDescription);
            } else {
                // "debouncing is hard" -dawson 12:39am
                // hideTextbox(scene);
                // selectedPolicy = null;
            }
        } else if (scene.state.phase === 'voting') {
            const characterIdx = key - 1;
            if (eliminated.includes(characterIdx)) {
                console.log(`can't eliminate ${characterTitles[characterIdx]}, he's already gone`);
                return;
            }

            console.log(`voting out ${characterTitles[characterIdx]}`);
            hideTextbox(scene);

            const votedString = `${characters[characterIdx]}VotedOut`;
            const votedAnnouncement = sounds[votedString];
            if (!votedAnnouncement || !lines[votedString]) {
                console.error('something terrible has happened pt. 3');
                return;
            }
            showTextbox(scene, characterTitles[characterIdx], lines[votedString]);
            votedAnnouncement.play();
            votedAnnouncement.on('complete', () => {
                hideTextbox(scene);
                sprites[characters[characterIdx]].destroy();
                eliminated.push(characterIdx);
                setTimeout(() => {
                    if (evil === characterIdx) {
                        // yippee we voted out the bad guy
                        win(scene, 'You voted out the spy!');
                    } else if (eliminated.length === 3) {
                        // we're out of good players, the bad guy wins
                        lose(scene, 'You voted out everyone except the spy!');
                    } else {
                        // otherwise start the next round with one less player
                        scene.state.phase = 'selection';
                        let firstChancellor = 0;
                        while (eliminated.includes(firstChancellor)) {
                            firstChancellor++;
                        }
                        generatePolicies(scene);
                        updateChancellor(scene, firstChancellor);
                    }
                }, 1000);
            });
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
    discardAnnouncement.play();
    discardAnnouncement.on('complete', () => {
        if (currentPolicies.length !== 2) {
            // console.log('I HAVE NO CLUE WHY THIS HAPPENS BUT THIS GUARD CLAUSE SEEMS TO FIX IT');
            // idk bro it's 3am
            return;
        }
        hideTextbox(scene);
        scrolls[discarded].destroy();
        currentPolicies.splice(discarded, 1);
        const enacted = currentPolicies[0];
        const revolt = enacted.revolt_delta;
        const money = enacted.money_delta;
        updateScoreboard(revolt, money);
        console.log(`approval = ${approval}, budget = ${budget}`);
        showTextbox(scene, 'POLICY ENACTED', `${enacted.text}\n${revolt >= 0 ? '+' : ''}${revolt} APPROVAL\n${money >= 0 ? '+' : ''}${money} BUDGET`);
        setTimeout(() => {
            hideTextbox(scene);
            if (approval < 0) {
                lose(scene, 'You ran out of approval!');
                return;
            }
            if (budget < 0) {
                lose(scene, 'You ran out of budget!');
                return;
            }
            currentPolicies.length = 0;
            for (const scroll of scrolls) {
                if (scroll) scroll.destroy();
            }
            scrolls.length = 0;
            scrolls.push(null);
            scrolls.push(null);
            scrolls.push(null);
            let nextChancellor = scene.state.currentChancellor + 1;
            while (eliminated.includes(nextChancellor)) {
                nextChancellor++;
            }
            if (nextChancellor >= 4) {
                startVote(scene);
            } else {
                scene.state.phase = 'selection';
                generatePolicies(scene);
                updateChancellor(scene, nextChancellor);
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

function updateScoreboard(approvalDelta, budgetDelta) {
    approval += approvalDelta;
    budget += budgetDelta;
    approvalTextSprite.setText(`Approval: ${approval}%`);
    budgetTextSprite.setText(`Budget: $${budget}`);
}

function win(scene, message) {
    scene.state.playing = false;
    scene.add.sprite(config.width / 2, config.height / 2, 'winSprite').setScale(2.5).setDepth(5).play('win');
    console.log(message);
    showTextbox(scene, message, '');
}

function lose(scene, message) {
    scene.state.playing = false;
    scene.add.sprite(config.width / 2, config.height / 2, 'loseSprite').setScale(2.5).setDepth(5).play('lose');
    console.log(message);
    showTextbox(scene, message, '');
}