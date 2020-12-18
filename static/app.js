const guess_form = document.querySelector('#guess-form');
const messages = document.querySelector('.message')
const words = document.querySelector('.words')
const score = document.querySelector('.score')
const time = document.querySelector('.time')
const input = document.querySelector('#guess')
const alert = document.querySelector('.alert')

let plays = 0
let correct_words = []
let time_left = 60000
let timer
let current_score = 0
score.innerHTML = current_score
time.innerHTML = "0:" + time_left / 1000;

const newgame = document.querySelector('.newgame')
newgame.addEventListener('click', startGame)

function startGame() {
    newgame.removeEventListener('click', startGame)
    current_score = 0
    correct_words = []
    time_left = 60000
    score.innerHTML = current_score
    time.innerHTML = "0:" + time_left / 1000;
    alert.innerHTML = ""
    guess_form.addEventListener('submit', handleSubmit)
    Timer()
}

function endGame() {
    newgame.addEventListener('click', startGame)
    guess_form.removeEventListener('submit', handleSubmit)
    plays++
    let score_promise = getHighScore()
    score_promise.then(high_score =>
        alert.innerHTML = `Game over, your score was ${current_score}, high score is ${high_score}, number of plays is ${plays}`);
}

function Timer() {
    if (time_left = 60000) {
        timer = setInterval(handleTime, 1000)
    } 
}

function handleTime() {
    if (time_left > 0) {
        time_left -= 1000
        time_left < 10000 ? time.innerHTML = '0:0' + time_left / 1000 : time.innerHTML = '0:' + time_left / 1000
    } else {
        clearInterval(timer);
        endGame();
    }
}

async function getHighScore() {
    const score_data = await axios.get('/high-score', { params: { 'score': current_score } });
    let score = score_data.data['high-score']
    return score
} 

async function handleSubmit(e) {
    e.preventDefault()
    const guess = document.querySelector('#guess').value
    if (guess.length < 3) {
        messages.innerHTML = "Guesses must be at least 3 characters"
    }
    else if (correct_words.includes(guess)) {
        messages.innerHTML = "You've already guessed that word"
    } else {
        const resp = await axios.get('/check-word', { params: { 'word': guess } });
        messages.innerHTML = resp.data.result

        if(resp.data.result === "ok") {
            let correct_word = document.createElement("p");  // Create with DOM
            correct_word.innerHTML = guess;
            correct_words.push(guess)
            words.append(correct_word); 
            
            points = guess.length
            current_score += points
            score.innerHTML = current_score
        }
    }
    input.value = ''
}