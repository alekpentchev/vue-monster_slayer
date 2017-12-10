new Vue ({
    el: '#app',
    data: {
        playerHealthbarWidth: 80,
        monsterHealthbarWidth: 80,
        gameStarted: false,
        showActionHistory: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameStarted = true;
            this.playerHealthbarWidth = 100;
            this.monsterHealthbarWidth = 100;
            this.showActionHistory = true;
            this.turns = [];
            this.turns.unshift({
                startGame: true,
                text: `Game has started!`
            })
        },
        
        clearGame: function() {
            this.playerHealthbarWidth = 100,
            this.monsterHealthbarWidth = 100,
            this.gameStarted = false,
            this.showActionHistory = false,
            this.turns = []
        },

        checkWin: function() {
            if(this.monsterHealthbarWidth <= 0) {
                if(confirm('You won, cool! Wanna new game?')){
                    this.startGame();
                } else {
                    this.clearGame();
                }
            }
            else if(this.playerHealthbarWidth <= 0) {
                if(confirm('What a looser... Wanna try again?')){
                    this.startGame();
                } else {
                    this.clearGame();
                }
            }
        },

        monsterAttacks: function() {
            let damage = Math.floor((Math.random() * 20) + 1);
            this.playerHealthbarWidth -= damage;

            this.turns.unshift({
                isMonster: true,
                text: `Monster hits the Player for ${damage}`
            })

            this.checkWin();
        },

        attack: function() {
            let damage = Math.floor((Math.random() * 20) + 1);
            this.monsterHealthbarWidth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: `Player hits the Monster for ${damage}`
            })
            
            this.monsterAttacks();
            
            this.checkWin();

        },

        onSpecialAttackClick() {
            let specialDamage = Math.floor((Math.random() * 20) + 1) + 10;
            this.monsterHealthbarWidth -= specialDamage;

            this.turns.unshift({
                isSpecial: true,
                text: `Player hit the Monster with Special Attack for ${specialDamage}`
            })
            this.monsterAttacks();
            
            this.checkWin();
        },

        onHealClick: function() {
            let addHealth = Math.floor((Math.random() * 10) + 10)
            this.playerHealthbarWidth += addHealth;
            this.turns.unshift({
                isHealed: true,
                text: `Player healed for ${addHealth}`
            })
            
            this.monsterAttacks();
        },

        onGiveUpClick: function() {
            this.playerHealthbarWidth = 0;
            this.turns.unshift({
                isGivenUp: true,
                text: `Player has given up!`
            })
        },
    },
})