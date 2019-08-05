/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scoreRound, activePlayer ,scores,start , prev,max;


init();
//initaization
function init (){
    start = true;
    scores = [0,0];
    activePlayer = 0;
    scoreRound = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    
}

//new game



document.querySelector('.btn-new').addEventListener('click', function(event) {
   init();
});

//toggle
function turn(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    scoreRound = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');  
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
        

}
//click on roll
document.querySelector('.btn-roll').addEventListener('click', function(event) {
    if(start){
        var rand = Math.floor((Math.random() * 6) + 1);
        var rand2 = Math.floor((Math.random() * 6) + 1);
        
       if(rand != 1 && rand2 != 1){
           prev = rand;
        scores[activePlayer] += (rand+rand2);
        scoreRound += (rand + rand2);   
        document.getElementById('current-'+activePlayer).textContent = scoreRound;
        document.getElementById('dice-1').src = 'dice-'+rand+'.png';
        document.getElementById('dice-2').src = 'dice-'+rand2+'.png';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';    
            
        }else{
            
            document.getElementById('current-'+activePlayer).textContent = 0;
            turn();
        }
    }
    
});
document.querySelector('.btn-hold').addEventListener('click', function(event) {
    if(start){
       document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        if(document.querySelector('.final-score').value){
            max = document.querySelector('.final-score').value;
         }else{
            max = 100;
        }
        if(scores[activePlayer] >= max){
             start = false;
             document.querySelector('.player-0-panel').classList.remove('active');
             document.querySelector('.player-1-panel').classList.remove('active');
             document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
             document.getElementById('name-'+activePlayer).textContent = 'Winner!';
            
            
        }   
       document.getElementById('current-0').textContent = 0;
       document.getElementById('current-1').textContent = 0;
        turn();
    }
    
});