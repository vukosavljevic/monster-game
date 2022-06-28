function getRandomValue (max,min){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            round : 0,
            winner : null,
            logMessages : []
        };
    },
   
    computed : {
        monsterBarStyles () {
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            if(this.playerHealth< 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.round % 3 !== 0
        }
    },
    watch : {
    playerHealth (value) {
        if(value <= 0 && this.monsterHealth <=0)
        {
            // a draw 
           this.winner = 'draw';
        }
        else if(value <= 0){
            // a loss
            this.winner = 'monster';
        }
    } , 
    monsterHealth(value) {
        if(value <= 0 && this.playerHealth <=0)
        {
            // a draw 
            this.winner = 'draw';
        }
        else if(value <= 0){
            // a loss
            this.winner = 'player';
        }
    }
    },
    methods :{
        attackMonster () {
            this.round++;
            const attackValue = getRandomValue(12,5);
            this.monsterHealth -= attackValue;
            this.addLogMess('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(15,8);
            this.playerHealth -= attackValue;
            this.addLogMess('monster','attack',attackValue);
        },
        specialAttack() {
            this.round++;
            const attackValue = getRandomValue(25,10);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMess('player','special-attack',attackValue);
        },
       healHealth () {
            this.round++;
            const healValue = getRandomValue(20,8)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }
            else
            {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMess('player','heal',healValue);
        },
        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.round = 0;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMess(who,what,value){
            this.logMessages.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value 
            });
        }   
    }
});
app.mount('#game');
